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

    if (throwError && !result)
    {
        Assert.handleVerificationFailure(`Not equal: ${expectedValue} and ${actualValue}`);
    }

    return result;
  }

  static isPositive(value : number, throwError : boolean = true) : boolean
  {
    let result = value > 0;

    if (throwError && !result)
    {
        Assert.handleVerificationFailure(`Not positive: ${value}.`);
    }

    return result;
  }

  static isInteger(value : number, throwError : boolean = true) : boolean
  {
    let result = value % 1 === 0;

    if (throwError && !result)
    {
      Assert.handleVerificationFailure(`Not an integer: ${value}.`)
    }

    return result;
  }

  private static equalValues<T>(a : T, b : T) : boolean
  {
    // Create arrays of property names
    let aProps : string[] = Object.getOwnPropertyNames(a);
    let bProps : string[] = Object.getOwnPropertyNames(b);

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length != bProps.length)
    {
        return false;
    }

    for (let i = 0; i < aProps.length; i++)
    {
        let propName = aProps[i];

        // If values of same property are not equal,
        // objects are not equivalent
        if (!Assert.equalValues(a[propName], b[propName]))
        {
            return false;
        }
    }

    // If we made it this far, objects
    // are considered equivalent
    return true;
  }

  private static handleVerificationFailure(message : string)
  {
    throw new Error(message);
  }
}

// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-