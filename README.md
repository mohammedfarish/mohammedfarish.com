
# My Personal Website

## Introduction

Welcome to the GitHub repository of my personal website,  [fari.sh](https://fari.sh/) (formerly [mohammedfarish.com](https://mohammedfarish.com)). This site is built using the futuristic, serverless Next.js framework, showcasing my skills and projects.

## Features

- **Serverless Architecture:** Utilizing Next.js for a seamless, efficient user experience.
- **Interactive Components:** Custom components to enhance user interaction, including a unique Terminal feature and dynamic Updates section on the homepage.
- **GPT-3.5 Integration:** Leveraging AI for dynamic content generation.
- **Responsive Design:** Tailored for an optimal experience across various devices.
- **Privacy Policy Page:** Outlining user data processing with options for users to view and opt out of data collection.

## Terminal

The homepage features a distinctive Terminal component, implemented in the `Terminal.jsx` file within the `components/homepage/hero/terminal` directory. This interactive element simulates a command-line interface, offering a creative way for users to engage with the website.

## Updates Section

The "Updates" section, implemented in the `Updates.jsx` file, dynamically displays various types of real-time information:

- **Latest GitHub Activity:** Showcasing recent commits or other GitHub actions.
- **Server Status:** Indicating the operational status of different servers or APIs.
- **Location Updates:** Providing the latest location information, possibly from GPS coordinates.

## Privacy Policy Page

The Privacy Policy page, implemented in `privacy-policy.jsx`, focuses on user data transparency and control:

### Key Aspects

- **User Data Transparency:** Clearly explains how user data is collected and used.
- **Opt-Out Option:** Users can view their data and choose to opt out of data collection.
- **Dynamic Content Loading:** Loads the latest privacy policy content dynamically.

### User Control

- **Viewing Data:** Users can see the data collected about them.
- **Disabling Tracking:** Provides an option for users to disable tracking, respecting their privacy choices.

This page reflects a commitment to transparency and user privacy, allowing visitors to understand and control how their data is handled.

---

## GPT-3.5 Integration

The website includes an innovative integration with OpenAI's GPT-3 for generating content. The `openaiCompletions` function interacts with the GPT-3 API, using data from [AboutMe.json](https://github.com/mohammedfarish/mohammedfarish.com/blob/master/pages/AboutMe.json) to create personalized content for the homepage and the `/me` pages. The generated "about me" text is set to regenerate once every week, ensuring fresh and updated content.

### Usage Example

The GPT-3 integration is used to generate a creative and convincing "about me" section in markdown format. Here's how it's implemented:

```javascript
import AboutMeJSON from "./AboutMe.json";

const formatted = JSON.stringify(AboutMeJSON);

const prompt = `Write a creative, interesting and highly convincing "about me" with the informations provided below. in markdown format. Hyperlinks. Filter out unneccessary information.
  
${formatted}`;

const aboutMe = await openaiCompletions({ prompt });
```

This code snippet demonstrates the process of converting the `AboutMe.json` data into a string, creating a prompt for GPT-3, and then using the `openaiCompletions` function to generate the content. The content is refreshed weekly to maintain relevance and interest.

## Project Structure

- `components/`: Custom React components used in the website.
- `pages/`: The main pages of the website, including JSON data for GPT-3.5.
- `public/`: Public assets including images and icons.
- `styles/`: Styling files for the website's design.
- `utils/`: Utility functions and helpers, including the GPT-3.5 integration.

## Technologies Used

- **Next.js**: For building a serverless web application.
- **Tailwind CSS**: For styling and responsive design.
- **JavaScript**: The primary programming language.
