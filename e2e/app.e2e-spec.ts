import { St1Page } from './app.po';

describe('st1 App', function() {
  let page: St1Page;

  beforeEach(() => {
    page = new St1Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
