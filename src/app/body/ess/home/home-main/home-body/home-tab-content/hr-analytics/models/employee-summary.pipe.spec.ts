import { EmployeeSummaryPipe } from './employee-summary.pipe';

describe('EmployeeSummaryPipe', () => {
  it('create an instance', () => {
    const pipe = new EmployeeSummaryPipe();
    expect(pipe).toBeTruthy();
  });
});
