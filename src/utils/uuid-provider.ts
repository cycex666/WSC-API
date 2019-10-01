import uuid from 'uuid/v1';

export const uniqueId = () => uuid().split('-').join('');
