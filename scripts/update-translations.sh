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

update :bible
update :quran
