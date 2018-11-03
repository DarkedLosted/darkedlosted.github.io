export default function createAction(type, payload) {
    return {
        type: type ? type : 'IS_ACTION',
        value: payload ? payload : {}
    }
}
