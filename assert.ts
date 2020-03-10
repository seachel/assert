export class Assert
{
  testLog : string[];

  constructor()
  {
    this.testLog = [];
  }

  private handleTestResult(testResult : boolean, testSummary : string) : boolean
  {
    if (testResult)
    {
      this.testLog.push("Pass: " + testSummary);
    }
    else
    {
      this.testLog.push("Fail: " + testSummary);
    }

    return testResult;
  }

  isEqual<T>(expectedValue : T, actualValue : T, valueEquality : boolean = false) : boolean
  {
    let testResult = Assert.isEqual(expectedValue, actualValue, valueEquality, false);

    let testSummary = `Expected value is \n ${JSON.stringify(expectedValue)}. \n Actual value is \n ${JSON.stringify(actualValue)}`;

    return this.handleTestResult(testResult, testSummary);
  }

  isPositive(value : number) : boolean
  {
    let testResult = Assert.isPositive(value, false);

    let testSummary = `value is ${value}.`;

    return this.handleTestResult(testResult, testSummary);
  }

  isInteger(value : number) : boolean
  {
    let testResult = Assert.isInteger(value, false);

    let testSummary = `value is ${value}.`;

    return this.handleTestResult(testResult, testSummary);
  }

  isSorted<T>(value : T[], descending : boolean = false) : boolean
  {
    let testResult = Assert.isSorted(value, descending, false);

    let orderNote = descending ? "descending" : "ascending";

    let testSummary = `array checked for ${orderNote} sort is ${value}`;

    return this.handleTestResult(testResult, testSummary);
  }

  // Static Verification Methods:
  // -*-*-*-*-*-*-*-*-*-*-*-*-*-*-
  // The default for the parameter on whether to throw an error is true by default and only set to false where called by instance assertion methods
  // This allows the user of this class to avoid giving this argument when the intention is to write quick assertions for verification in other code

  static isEqual<T>(expectedValue : T, actualValue : T, valueEquality : boolean = false, throwError : boolean = true) : boolean
  {
    let result = false;

    if (valueEquality)
    {
      // result = Assert.equalValues(expectedValue, actualValue);
      // result = deepEqual(expectedValue, actualValue);
      result = JSON.stringify(expectedValue) === JSON.stringify(actualValue);
    }
    else
    {
      result = expectedValue === actualValue;
    }

    Assert.handleVerificationResult(result, `Not equal: ${expectedValue} and ${actualValue}`, throwError);

    return result;
  }

  static isPositive(value : number, throwError : boolean = true) : boolean
  {
    let result = value > 0;

    Assert.handleVerificationResult(result, `Not positive: ${value}.`, throwError);

    return result;
  }

  static isInteger(value : number, throwError : boolean = true) : boolean
  {
    let result = value % 1 === 0;

    Assert.handleVerificationResult(result, `Not an integer: ${value}.`, throwError);

    return result;
  }

  static isSorted<T>(value : T[], descending : boolean = false, throwError : boolean = true)
  {
    let result = true;

    const copyArrayValue = arr => arr.slice();

    let valueAscending : T[] = copyArrayValue(value);

    if (descending)
    {
      valueAscending.reverse();
    }

    for (let i = 0; i < valueAscending.length - 1; i++)
    {
      if (valueAscending[i] > valueAscending[i + 1])
      {
        result = false;
        break;
      }
    }

    Assert.handleVerificationResult(result, `Not sorted: ${value}.`, throwError);

    return result;
  }

  private static handleVerificationResult(result : boolean, failureMessage : string, throwError : boolean)
  {
    if (throwError && !result)
    {
      throw new Error(failureMessage);
    }
  }
}

// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-

let myTests = new Assert();

myTests.isSorted([1,2,3,4]);
myTests.isSorted([4,2,3,4]);
myTests.isSorted([4,3,2,1], true);

console.log(myTests.testLog);