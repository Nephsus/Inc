import { IncPage } from './app.po';

describe('inc App', () => {
  let page: IncPage;

  beforeEach(() => {
    page = new IncPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
