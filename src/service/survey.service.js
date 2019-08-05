import httpRequest from './../helper/http-request.helper';

const apiUrl = "http://localhost:3000";

class SurveyService {
    constructor() {

    }

    countResult(id) {
        return httpRequest.post(apiUrl + '/survey/count-result', {
            idSurvey: id
        });
    }

    saveSurvey(name, questions) {
        return httpRequest.post(apiUrl + '/survey/publish', {
            name: name,
            questions: questions
        });
    }

    getListSurvey() {
        return httpRequest.post(apiUrl + '/survey/list-survey', {});
    }

    getSurvey(id) {
        return httpRequest.post(apiUrl + '/survey/get-survey', {idSurvey: id});
    }

    submitSurvey(survey) {
        return httpRequest.post(apiUrl + '/survey/submit-survey', survey);
    }

    deleteSurvey(id) {
        return httpRequest.post(apiUrl + '/survey/delete-survey', {idSurvey: id});
    }

    getResultSurvey(id) {
        return httpRequest.post(apiUrl + '/survey/get-calculated-result', {idSurvey: id});
    }

    checkIfOwnSurvey(id) {
        return httpRequest.post(apiUrl + '/survey/if-own-survey', {idSurvey: id});
    }
}

let service = new SurveyService();

export default service;