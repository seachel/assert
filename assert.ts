export class Assert
{
  testLog : string[];

  constructor()
  {
    this.testLog = [];
  }

  isEqual<T>(expectedValue : T, actualValue : T, valueEquality : boolean = false) : boolean
  {
    let testResult = Assert.isEqual(expectedValue, actualValue, valueEquality, false);

    let testSummary = `Expected value is \n ${JSON.stringify(expectedValue)}. \n Actual value is \n ${JSON.stringify(actualValue)}`;

    if (testResult)
    {
      testSummary = "Pass: " + testSummary;
    }
    else
    {
      testSummary = "Fail: " + testSummary;
    }

    this.testLog.push(testSummary);

    return testResult;
  }

  isPositive(value : number) : boolean
  {
    let testResult = Assert.isPositive(value, false);

    let testSummary = `value is ${value}.`;

    if (testResult)
    {
      testSummary = "Pass: " + testSummary;
    }
    else
    {
      testSummary = "Fail: " + testSummary;
    }

    this.testLog.push(testSummary);

    return testResult;
  }

  isInteger(value : number) : boolean
  {
    let testResult = Assert.isInteger(value, );

    let testSummary = `value is ${value}.`;

    if (testResult)
    {
      testSummary = "Pass: " + testSummary;
    }
    else
    {
      testSummary = "Fail: " + testSummary;
    }

    this.testLog.push(testSummary);

    return testResult;
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

  private static handleVerificationResult(result : boolean, failureMessage : string, throwError : boolean)
  {
    if (throwError && !result)
    {
      throw new Error(failureMessage);
    }
  }
}

// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-