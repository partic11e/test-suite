import { assertEquals } from "../../dev_deps.ts";
import { Testing, ITestMeta } from "../../mod.ts";

const { Test, TestSuite, TestCase, TestEnd } = Testing.decorators;

const inc = {
  test: 0
};

@TestSuite("TestEnd")
class TestSuiteClass {

  @Test("runs after each test")
  @TestCase([0, "hello"], [1, "world"], [2, "!"])
  @TestEnd(() => inc.test++)
  testRunsAfterTest([count, msg]:[number, string], { test, testCase }: ITestMeta) {
    assertEquals(test.iterationCount, 1);
    assertEquals(test.testCaseCount, 3);
    assertEquals(count, testCase.index);
    assertEquals(inc.test, 0);
    assertEquals([count, msg], testCase.args);
    assertEquals(count === 0, testCase.first);
    assertEquals(count === 2, testCase.last);
  }

  @Test("runs before next test")
  @TestCase([0, "hello"], [1, "world"], [2, "!"])
  @TestEnd(() => inc.test++)
  testRunsBeforeNextTest([count, msg]:[number, string], { test, testCase }: ITestMeta) {
    assertEquals(test.iterationCount, 1);
    assertEquals(test.testCaseCount, 3);
    assertEquals(count, testCase.index);
    assertEquals(inc.test, 1);
    assertEquals([count, msg], testCase.args);
    assertEquals(count === 0, testCase.first);
    assertEquals(count === 2, testCase.last);
  }
  
  @Test("final check")
  @TestCase([0, "hello"], [1, "world"], [2, "!"])  
  testFinalCheck([count, msg]:[number, string], { test, testCase }: ITestMeta) {
    assertEquals(test.iterationCount, 1);
    assertEquals(test.testCaseCount, 3);
    assertEquals(count, testCase.index);
    assertEquals(inc.test, 2);
    assertEquals([count, msg], testCase.args);
    assertEquals(count === 0, testCase.first);
    assertEquals(count === 2, testCase.last);
  }
}

Testing(TestSuiteClass);
