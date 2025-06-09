# OOGA Applications Feedback Form URL Builder

The purpose of this application is to help construct a valid URL for users to access the *OOGA Applications Feedback Form* to provide feedback for a specific OOGA application.

Two values should be included in the survey's URL
    1. App Name (app_name)
    2. App URL (app_url)

By collecting this information we can customize the display of the survey for users and gather information about what app the user is provider feedback on. We can collect feedback in a single form without forcing users to type a value in or for OOGA staff to maintain a dropdown list of apps in the survey.

## Configuration

The item ID for the survey and the base URL are configured in `src/config/survey/surveyConfig.js`:


```js
const surveyConfig = {
    SURVEY_ITEM_ID: '<survey item ID>',
    SURVEY_BASE_URL: 'https://survey123.arcgis.com',
}
```

These only need to be updated if the survey is repbulished or the hosting Portal changes from ArcGIS Online.

## Development

Download

Install

```bash
cd app-feedback-survey-url-builder
npm install
```

start dev server using Vite

```bash
npm run dev
```

build

```bash
npm run build
```

Deploy dist files to `oogamaps.wcpss.net/public/app-feedback-survey-url-builder`