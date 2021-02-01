import httpService from './http.service';

const getScores = () => httpService.get('/score');

const saveScore = (data) => httpService.post('/score', data);

export default {
  getScores,
  saveScore,
};
