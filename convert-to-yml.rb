require "json"
require "yaml"

Encoding.default_external = Encoding::UTF_8
Encoding.default_internal = Encoding::UTF_8

# load old data..
old_data = JSON.parse(File.read("old_data.json"))

# from http://stackoverflow.com/questions/1268289/how-to-get-rid-of-non-ascii-characters-in-ruby
encoding_options = {
  :invalid           => :replace,  # Replace invalid byte sequences
  :undef             => :replace,  # Replace anything not defined in ASCII
  :replace           => '',        # Use a blank for those replacements
  :universal_newline => true       # Always break lines with \n
}

# each feature to yaml file..
old_data["features"].each do |feature|
  if feature["properties"]["markt"] == "rathaus"
    yml_stand = feature
    yml_stand["geometry"] = feature["geometry"].to_json
    if feature["properties"]["warenangeb"] != nil
      yml_stand["properties"]["angebot"] = feature["properties"]["warenangeb"].split(",").map(&:strip)
    end
    yml_stand["properties"]["warenangeb"] = nil
    begin
      filename = yml_stand["properties"]["betreiber"].encode(Encoding.find('ASCII'), encoding_options).gsub(/\s/, "")[0..8]
    rescue
      filename = ""
    end

    File.open("_data/staende/#{yml_stand["properties"]["stand_nr"]}#{filename}.yml","w") do |f|
      f.write(yml_stand.to_yaml)
    end
  end
end
