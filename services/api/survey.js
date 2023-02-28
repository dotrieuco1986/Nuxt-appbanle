export default $axios => ({
    update (param) {
        return $axios.$post('/survey/update', param)
    },
    updateComplete (surveyId, invoice) {
        return $axios.$post('/survey/complete', { survey_id: surveyId, invoice })
    },
    sendmail (surveyId) {
        return $axios.$post('/survey/sendmail/' + surveyId)
    }
})
