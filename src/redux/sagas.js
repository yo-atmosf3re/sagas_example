import { call, put, takeEvery, all } from 'redux-saga/effects';
import { FETCH_DATA_REQUEST, fetchDataSuccess, fetchDataFailure } from './actions';

function* fetchDataSaga() {
  try {
    const response = yield call(fetch, 'https://jsonplaceholder.typicode.com/photos');
    const data = yield response.json();
    yield put(fetchDataSuccess(data.slice(0, 10)));
  } catch (error) {
    yield put(fetchDataFailure(error.message));
  }
}

function* watchFetchDataSaga() {
  yield takeEvery(FETCH_DATA_REQUEST, fetchDataSaga);
}

export default function* rootSaga() {
  yield all([
    watchFetchDataSaga(),
  ]);
}