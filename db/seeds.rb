# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
puts "---Seeding Database---"
clips = [
	{
		:title => 'Laughs: Bring it back', 
		:default_image => 'clips/images/pinkSquare_Small.png', 
		:playing_image => 'clips/images/blueSquare_Small.png',
		:info => 'Laughs: Bring it back',
		:sound_board_clip_sources => [{
			:path_local => '/home/prawri/public_html/thechrisbrakeshow/public/clips/bring_it_back.mp3',
			:url => 'clips/bring_it_back.mp3',
			:media_type => 'audio/mpeg'
		},
			:path_local => '/home/prawri/public_html/thechrisbrakeshow/public/clips/bring_it_back.ogg',
			:url => 'clips/bring_it_back.ogg',
			:media_type => 'audio/ogg'
		]
	},
	{
		:title => 'Brake: Does this really matter', 
		:default_image => 'clips/images/pinkSquare_Small.png', 
		:playing_image => 'clips/images/blueSquare_Small.png',
		:info => 'Brake: Does this really matter',
		:sound_board_clip_sources => [{
			:path_local => '/home/prawri/public_html/thechrisbrakeshow/public/clips/does_this_matter.mp3',
			:url => 'clips/does_this_matter.mp3',
			:media_type => 'audio/mpeg'
		},
			:path_local => '/home/prawri/public_html/thechrisbrakeshow/public/clips/does_this_matter.ogg',
			:url => 'clips/does_this_matter.ogg',
			:media_type => 'audio/ogg'
		]
	},
	{
		:title => 'Sarah: Yeah, this is so awesome', 
		:default_image => 'clips/images/pinkSquare_Small.png', 
		:playing_image => 'clips/images/blueSquare_Small.png',
		:info => 'Sarah: Yeah, this is so awesome',
		:sound_board_clip_sources => [{
			:path_local => '/home/prawri/public_html/thechrisbrakeshow/public/clips/yeah_that_is_so_awesome.mp3',
			:url => 'clips/yeah_that_is_so_awesome.mp3',
			:media_type => 'audio/mpeg'
		},
			:path_local => '/home/prawri/public_html/thechrisbrakeshow/public/clips/yeah_that_is_so_awesome.ogg',
			:url => 'clips/yeah_that_is_so_awesome.ogg',
			:media_type => 'audio/ogg'
		]
	},
	{
		:title => 'John: I Really Vote for a Restart', 
		:default_image => 'clips/images/pinkSquare_Small.png', 
		:playing_image => 'clips/images/blueSquare_Small.png',
		:info => 'John: I Really Vote for a Restart',
		:sound_board_clip_sources => [{
			:path_local => '/home/prawri/public_html/thechrisbrakeshow/public/clips/I_Really_Vote_For_A_Restart.mp3',
			:url => 'clips/I_Really_Vote_For_A_Restart.mp3',
			:media_type => 'audio/mpeg'
		},
			:path_local => '/home/prawri/public_html/thechrisbrakeshow/public/clips/I_Really_Vote_For_A_Restart.ogg',
			:url => 'clips/I_Really_Vote_For_A_Restart.ogg',
			:media_type => 'audio/ogg'
		]
	},
	{
		:title => 'Brake: Apologize to my Sizner', 
		:default_image => 'clips/images/pinkSquare_Small.png', 
		:playing_image => 'clips/images/blueSquare_Small.png',
		:info => 'Brake: Apologize to my Sizner',
		:sound_board_clip_sources => [{
			:path_local => '/home/prawri/public_html/thechrisbrakeshow/public/clips/I_Would_Like_To_Appologize_To_My_Sizner.mp3',
			:url => 'clips/I_Would_Like_To_Appologize_To_My_Sizner.mp3',
			:media_type => 'audio/mpeg'
		},
			:path_local => '/home/prawri/public_html/thechrisbrakeshow/public/clips/I_Would_Like_To_Appologize_To_My_Sizner.ogg',
			:url => 'clips/I_Would_Like_To_Appologize_To_My_Sizner.ogg',
			:media_type => 'audio/ogg'
		]
	},
	{
		:title => 'Sarah: Whos NPR?', 
		:default_image => 'clips/images/pinkSquare_Small.png', 
		:playing_image => 'clips/images/blueSquare_Small.png',
		:info => 'Sarah: Whos NPR?',
		:sound_board_clip_sources => [{
			:path_local => '/home/prawri/public_html/thechrisbrakeshow/public/clips/whos_npr.mp3',
			:url => 'clips/whos_npr.mp3',
			:media_type => 'audio/mpeg'
		},
			:path_local => '/home/prawri/public_html/thechrisbrakeshow/public/clips/whos_npr.ogg',
			:url => 'clips/whos_npr.ogg',
			:media_type => 'audio/ogg'
		]
	}
]


clips.each do |clip|
	Clip.find_or_create_by_title(clip[:title]) do |c|
		c.default_image = clip[:default_image]
		c.playing_image = clip[:playing_image]
		c.info = clip[:info]
		
		puts "saving clip " + c.title
		c.save
		
		clip[:sound_board_clip_sources].each do |source|
			clipSource = c.sound_board_clip_sources.create(source)
			puts "  saving clip source " + clipSource.path_local
			clipSource.save
		end
		

	end
end
puts "---Seeding Complete---"

