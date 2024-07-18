# MITH (Static) Website

This is the Gatsby static site for https://mith.umd.edu. It builds pages based
on data stored in several Airtable bases.

## Staging Site

Pushing to GitHub will trigger an automated GitHub action that builds the
staging site at:

    https://umd-mith.github.io/mith-static/

The staging site can also be updated manually (for example to show the latest changes on Airtable)
by triggering the Action [Publish Staging Site on GitHub Pages](https://github.com/umd-mith/mith-static/actions/workflows/staging.yml).

## Publish

To publish the website at https://mith.umd.edu, trigger the Action [Build and Publish Site](https://github.com/umd-mith/mith-static/actions/workflows/publish.yml).

You may also build the site locally and `rsync` the built site if you have the right permissions; there is an Ansible playbook to help you set up access at [mith-ansible](https://github.com/umd-mith/mith-ansible).

## Develop

To build the site you will need to install a few things:

- [Node](https://nodejs.org): a JavaScript programming environment
- [Git](https://git-scm.com/): version control software

Then you will need to get this repository:

    git clone https://github.com/umd-mith/mith-static/

Then you need to install some of the site dependencies:

    cd mith-static
    npm install

You will need to configure your environment so that you can fetch data from the MITH Airtable:

    cp .env-template .env

Ask a MITH team member for the correct values to add to your .env file.

You will also need a personal token from Airtable. Once logged in, you can generate one at https://airtable.com/create/tokens.

Now you are ready to start the development server:

    npm run develop

## Test

To run the project's tests:

`npm run test`

You may also be required to install Playwright and test browser binaries with `npx playwright install`
