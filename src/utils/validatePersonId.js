const firstPart = 0;
const secondPart = 1;
const thirdPart = 2;
const fourthPart = 3;
const fifthPart = 4;
const idParts = 5;
const codeLength = 36;
const codeFirstPartLength = 8;
const codeMiddlePartLength = 4;
const codeLastPartLength = 12;

module.exports =
  function validatePersonId(personId) {
    const personIdArr = personId.split('-');
    return (
      personId.length === codeLength
      && personIdArr.length === idParts
      && personIdArr[firstPart].length === codeFirstPartLength
      && personIdArr[secondPart].length === codeMiddlePartLength
      && personIdArr[thirdPart].length === codeMiddlePartLength
      && personIdArr[fourthPart].length === codeMiddlePartLength
      && personIdArr[fifthPart].length === codeLastPartLength
    )
  }