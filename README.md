# Travel App
Travel is a Front-End project from the Mod 2 curriculum at Turing School of Software & Design.
Given a URL containing datasets for all traveler, trips, and destinations I used the Fetch API to retrieve data and update the DOM with a specific user’s information. Concepts introduced during the course of this project included webpack, network requests and responses, and Test Driven Development.

The Travel App is a useful dashboard for users to view their current trips, pending trips, and past trips. A user can also request a trip that the agency will then approve or deny.


## How to Run

1. Fork the repository
2. Clone down your new, forked repo
3. `cd` into the repository
4. Run `npm install` in the CLI
5. Run `npm start` in the CLI
6. Open the site by copying and pasting the server location in your URL bar
    -   The server location should look something like this -> http://localhost:8080/


### Tech
- JavaScript
- CSS
- HTML
- Mocha & Chai
- VS Code & Atom


### Future additions
- Add feature in agency display that will show a specific travelers trips.


### Design Inspiration
For this project I sourced design inspiration from Dribble creators, and stalked travel agency websights:


#### Contributors
This application was built by:
- [Katie Ammon](https://github.com/kammon10)


Since code is separated into multiple files, you need to use the `import` and `export` syntax to share code across file.

### HTML

Add the HTML you need in the `index.html` file in the `./dist` directory. There is some boilerplate HTML that exists from the start that you can modify.

---

## Test Files Organization

Similar to feature code, your test code needs to be put in a specific place for it to run successfully.

**Put all of your test files in the `test` directory.** As a convention, all test filenames should end with `-test.js`. For instance: `box-test.js`.

## Running Your Tests

Run your test suite using the command:


The test results will output to the terminal.

---
## Deploying to GitHub Pages

_If you are finished with the functionality and testing of your project_, then you can consider deploying your project to the web! This way anyone can play it without cloning down your repo.

[GitHub Pages](https://pages.github.com/) is a great way to deploy your project to the web. Don't worry about this until your project is free of bugs and well tested!

If you _are_ done, you can follow [this procedure](./gh-pages-procedure.md) to get your project live on GitHub Pages.
