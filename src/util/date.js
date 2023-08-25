export const getStringDate = (date) => {
    return date.toISOString().slice(0, 10); //ISO형식의 문자열 반환(ex.2023-08-22)
  }