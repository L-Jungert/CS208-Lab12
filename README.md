# CS208 Full Stack Final Project - TODO List Application

- Name: Logan Jungert
- Term: Summer 2026

## Project Description

This is my full-stack application for CS208, built with Node.js. I built a
TODO list web application that allows users to manage a list of tasks. Users
can add new tasks, edit an existing task's description, mark a task as
completed or not completed, and delete tasks. The application uses Express for
the backend, Pug for templating, and MariaDB (MySQL) for the database. Please
read the following instructions carefully because some of the setup only needs
to be done once.

## Features

- View all tasks on the home page, each showing its description and status
  (Completed / Not Completed).
- Add a new task using the form. Blank or whitespace-only tasks are rejected
  on both the front end (HTML `required` attribute) and the back end.
- Edit a task: change its description and toggle its state between
  "Completed" and "Not Completed".
- Delete a task.

## Install the Database

To set up the database, run the `install_db.sh` script in the setup_scripts
directory. This script will install MariaDB and start the server running. You
only need to run this script once per Codespace.

```bash
./setup_scripts/install_db.sh
```

When the script prompts you, use the following answers:

- Switch to unix_socket authentication [Y/n] **n**
- Change the root password? [Y/n] **Y**
  - Set the password to **12345**
- Remove anonymous users? [Y/n] **Y**
- Disallow root login remotely? [Y/n] **Y**
- Remove test database and access to it? [Y/n] **Y**
- Reload privilege tables now? [Y/n] **Y**

The database credentials are configured in `db.js` (user `root`, password
`12345`, database `cs208demo`). If you choose a different password during
setup, update `db.js` to match.

Verify the database is running:

```bash
sudo service mariadb status
```

## Create the Database Tables

Create the initial `todos` table by running the following command (enter the
password `12345` when prompted):

```bash
sudo mysql -u root -p < ./setup_scripts/create_demo_table.sql
```

This creates the `cs208demo` database and a `todos` table with the columns
`id` (auto-increment primary key), `task` (the task description), and
`completed` (a boolean for the task's state).

Verify the database was created:

```bash
mysql -u root -p -e 'show databases;'
```

You should see `cs208demo` listed.

## Install Dependencies

Install the required dependencies using npm:

```bash
npm install
```

## Run the Application

Start the application using the following command:

```bash
npm start
```

## Access the Application

On Codespaces, access the application by forwarding port **3000**. Open the
forwarded port in your browser to view the application. Locally, navigate to
`http://localhost:3000`.

## How to Use

- The home page lists all current tasks. Use the "Add a new task" form at the
  bottom to create a task.
- Click **Edit** next to any task to change its description or toggle whether
  it is completed, then click **Save Changes**.
- Click **Delete** next to a task to remove it.

## Troubleshooting

If you cannot connect to the database, confirm the user and password in
`db.js` match what you set during installation. Check that MariaDB is running
with `sudo service mariadb status`, and start it with
`sudo service mariadb start` if needed. If the `cs208demo` database is
missing, re-run the `create_demo_table.sql` script shown above.
