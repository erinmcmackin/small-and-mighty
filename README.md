# small-and-mighty
https://small-and-mighty.herokuapp.com/

Using a mix of CSS, HTML, JS, Node.js, Express, MongoDB, and Mongoose, I created this community app for small business owners. On the app, learn from articles posted by the site owners, as well as community members, and even post your own articles. You can also participate in the community forum.

User story for the basis of this app:
As a small business owner, I would like an app with relative content for my business, from others like me, in an attractive format that also allows me to participate in the conversation, so I can learn from other small business owners, and help them as well.

Articles:
Anyone can view articles, but only logged-in users can create articles.
Once created, the author and admins are the only users who can edit content or delete articles.

Users:
Passwords are encrypted and users can create articles and post to the forum, as well as comment on other users' forum posts.

Sessions:
Site visitors can create a username and encrypted password, log in, and log out.

Forum:
Anyone can view the forum and forum comments, but only signed-in users can create posts or comment on posts.
Posts and comments cannot be edited or deleted.

Future Enhancements:
-Timestamps on articles and posts
-New password match validation
-Wrong password alert instead of res.send on sessions controller
-Login/new user popups
-Unique names
-Redirect back after login
-New comment from forum page
