import { ColmahacketonPage } from './app.po';

describe('colmahacketon App', () => {
  let page: ColmahacketonPage;

  beforeEach(() => {
    page = new ColmahacketonPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
