# Project Name

Authentication project

Description: This project is a full-stack web application that allows users to securely register, log in, and manage their personal notes. Each user has an individual account, and upon logging in, they can add, view, and delete notes. The app ensures that each user can only access their own notes and provides a clean and simple interface for ease of use.

Key Features:

User Authentication: Secure registration and login using encrypted passwords and session-based authentication.
Note Management: Logged-in users can create, view, and delete personal notes.
Authorization: Protected routes ensure that only authenticated users can access or modify their notes.
Responsive Design: Simple and user-friendly interface built using EJS templates for dynamic content rendering.

Technologies Used:

Backend: Node.js, Express.js
Database: MongoDB with Mongoose for object data modeling
Authentication: Express sessions and bcrypt for password hashing
Frontend: EJS templating engine for server-side rendering
Other Tools: Middleware for route protection, session management, and user validation.

Project Highlights:

Built a secure authentication system with password encryption.
Implemented user-specific note management with data privacy.
Designed modular code structure with separate routes, models, and middleware for scalability.


## File Structure

```
project-root/
│auth-project/
│
├── middleware/
│ └── ensureAuth.js
│ 
├── models/
│ └── [database model files]
│
├── public/
│ |── styles.css
│
├── routes/
│ └── auth.js
│ └── notes.js
├── views/
│ └── [view template files]
│
├── app.js
├── package.json
└── README.md

```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

