# MITH Website

This is the code repository for the website of the Maryland Institute for Technology in the Humanities, University of Maryland College Park.

https://mith.umd.edu

## Development

This is an Astro website. Use `pnpm` to build and develop the site.

## Data

Most data is stored on Airtable. You will need access to MITH's Airtable and you will need to set the following secrets: `AIRTABLE_MITH_BASE_ID` (the ID of the Airtable Base) and `AIRTABLE_TOKEN` (a personal access token that can be generated on the Airtable website).

News are stored as markdown files and can be edited manually or via the CMS.

## CMS

We use Sveltia CMS, accessible at `/admin`. You will need a GitHub Personal Access Token with `repo` write permissions to this repository in order to contribute content.