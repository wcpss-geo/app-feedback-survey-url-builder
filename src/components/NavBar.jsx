import React from 'react';
import './NavBar.css';
import surveyConfig from '../config/surveyConfig';

function NavBar() {
    const { SURVEY_ITEM_ID, SURVEY_BASE_URL } = surveyConfig;

    const feedbackSurveyLink = `${SURVEY_BASE_URL}/share/${SURVEY_ITEM_ID}?field:app_name=OOGA%20App%20Feedback%20Survey%20URL%20Builder&field:app_url=https%3A%2F%2Foogamaps.wcpss.net%2Fapp-feedback-survey-url-builder`;

    return (
        <nav className="navbar">
            <div className="navbar-title">
                OOGA Application Feedback Link Generator
            </div>
            <div className="navbar-links">
                <a href={feedbackSurveyLink} target="_blank" rel="noopener noreferrer">
                    Feedback
                </a>
            </div>
        </nav>
    );
}

export default NavBar;