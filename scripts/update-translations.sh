#!/usr/bin/env ruby

require 'rubygems'
require 'rubygems/dependency_installer'
require 'json'
require 'open-uri'

def require_gem gem_name
  begin
    gem gem_name
  rescue LoadError
    Gem::DependencyInstaller.new.install gem_name
  end
  require gem_name
end

require_gem 'nokogiri'
require_gem 'terminal-table'

def process_bible doc
  collection_id = doc.root['id']

  books = {}
  doc.css('book').each do |book|
    books[book['id']] = [book['name'].downcase]
  end

  output = <<EOM
/**
 * Abbreviation for the book itself in case included
 * in the in-page references
 */
let abbreviation = '#{collection_id}';

/**
 * Available books in the translation
 * NOTE: Must be lowercase for case insensitive array matching
 */
let books = #{JSON.pretty_generate(books)};

export default { abbreviation, books };
EOM

  export :bible, collection_id, output
end

def process_quran doc
  collection_id = doc.root['id']

  chapters = []
  doc.css('chapter').each do |chapter|
    chapters << [chapter['name'].downcase]
  end

  output = <<EOM
/**
 * Abbreviation for the book itself in case included
 * in the in-page references
 */
let abbreviation = '#{collection_id}';

/**
 * Available chapters in the translation
 * NOTE: Must be lowercase for case insensitive array matching
 */
let chapters = #{JSON.pretty_generate(chapters)};

export default { abbreviation, chapters };
EOM

  export :quran, collection_id, output
end

def export format, identifier, data
  dir = File.expand_path("../src/books/#{format}", File.dirname(__FILE__))
  file = File.join(dir, "#{identifier}.js")
  File.open(file, 'w') {|f| f.write(data)}
end

def update format
  metafile = "https://raw.githubusercontent.com/alkotob/#{format}-translations/master/metadata.json"
  translations = JSON.parse(open(metafile).read)['data']

  translations.each do |translation|

    # For updating wiki
    name = "[#{translation['name']}](https://alkotob.org/#{translation['id']})"
    file_link = "[#{translation['file']}](https://github.com/alkotob/bible-translations/raw/master/data/#{translation['file']})"
    @table_rows << [
      name,
      format,
      translation['id'],
      translation['original'],
      translation['direction'],
      translation['language'],
      file_link
    ]

    filename = "https://raw.githubusercontent.com/alkotob/#{format}-translations/master/data/#{translation['file']}"
    open(filename) do |f|
      doc = Nokogiri::XML(f)

      if format == :quran
        process_quran(doc)
      else
        process_bible(doc)
      end
    end
  end
end

# Variable for storing meta infomration for readme
@table_rows = [['Name', 'Format', 'ID', 'Original', 'Direction', 'Language', 'File'], :separator]

update :bible
update :quran

### Update the README with translations -----------------------

# Format markdown table
table = (Terminal::Table.new rows: @table_rows)
  .to_s
  .split(/\n/)[1..-2]
  .join("\n")
  .gsub('+', '|')

# Update readme
dir = File.expand_path("../", File.dirname(__FILE__))
readme_file = File.join(dir, 'README.md')
text = File.read(readme_file)

contents = []
text.each_line do |line|
  break if line.include? '| ID'
  contents << line
end

contents << table

File.open(readme_file, 'w') {|f| f.write(contents.join) }
