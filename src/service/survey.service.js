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
}

let service = new SurveyService();

export default service;