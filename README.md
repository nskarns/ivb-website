# Irish Volunteer Brigade Website (2026)
This is the second iteration of a desktop and mobile responsive website to help promote and hopefully have people join the Irish Volunteer Brigade online gaming group that mostly plays the video game called War of Rights. This website includes advertisements for the regiemnt, their leadership hierarchy, who is currently online in their over 1,600 member discord, and much more.

[Irish Volunteer Brigade Website](https://theirishvolunteers.com/)

[Figma Design](https://www.figma.com/design/EYLFVkaJpGM6YWt8PB4sHB/IVB-Website-Redesign?node-id=0-1&t=AeaKEMQR97GxtOv1-1)

[Original Website Repository](https://github.com/nskarns/ivb-2024-website)

## Improvements
As mentioned above, this is the second iteration of the Irish Volunteer Brigade Website. I wanted to improve on the website to enhance the user experience but also show the new skills that I have been learning. The improvements to this website are:

1. Using React and components alongside Bootstrap for each page instead of HTML and CSS for everything.

2. Discord API calls are made on website load instead of waiting for user to go to a page where that API call is needed causing less waiting for data.

3. Tried to use SVG files instead of PNG files for faster load in times.

4. Reduced codebase size by combining leadership/member display into one API call instead of two seperate calls within multiple files.

5. General UI improvements and updated information to reflect the changes of the group since the previous version of the website was made.

## Development Process

The creation of this second iteration was done using React using Bootstrap and CSS to operate the styling of the frontend while using Discord's API and Flask to operate the "backend" of the website that all functional runs on the world wide web through [Heroku's](https://www.heroku.com/) hosting platform. Instead of starting from scratch as last time, I used a React template to start this off then applied a lot of the previous website's code to fit this newer website.

This website is mostly a static website except for the structure page which shows who is currently online in this group's discord. In order to make that happen, I created a Discord Bot that is in that server that will send information through Discord's API system to [discord-online.py](https://github.com/nskarns/ivb-website/blob/main/server/discord_online.py). Once that information is recieved, I use Python to filter out every person who is offline, create a list of those people who are online, then use JavaScript to generate a icon and username to show on the website.

The process of seeing who is online within this group's Discord is ran on a server hosted on [Heroku](https://www.heroku.com/).

## Code Explanations

### [app.py](https://github.com/nskarns/ivb-website/blob/main/server/app.py)

This file coordinations the conversation between the Flask application and Discord's API to retrieve all of the members from this group's Discord. When the website first loads for a user the [app.jsx](https://github.com/nskarns/ivb-website/blob/main/client/src/app.jsx]) file makes a call to [app.py](https://github.com/nskarns/ivb-website/blob/main/server/app.py) to run the `run_discord_refresh` function that tries to grab who is online in that Discord through the `fetch_online_members` function that is in [discord_online.py](https://github.com/nskarns/ivb-website/blob/main/server/discord_online.py). Once that data is retrieved, it sets `members_data` to those members. Once `members_data` is set, [app.jsx](https://github.com/nskarns/ivb-website/blob/main/client/src/app.jsx]) is able to then use that information to paste the online members and the leadership of each regiment on the structure page.

### [discord-online.py](https://github.com/nskarns/ivb-website/blob/main/server/discord_online.py)

This file uses the group's discord server and the token of the Discord Bot within that server to grab all of hte online members and place it within a dictionary that is then returned.

## Useful Commands:
source env/Scripts/activate - Enter ENV
