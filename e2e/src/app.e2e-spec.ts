import { browser } from 'protractor';
import { Angular2FullStackPage } from './app.po';

describe('ClickHotelMean App', () => {
  let page: Angular2FullStackPage;

  beforeEach(() => {
    page = new Angular2FullStackPage();
  });

  it('should display the expanded navbar for high resolutions', () => {
    browser.manage().window().setSize(1024, 768);
  });

  it('should display the collapsed navbar for low resolutions', () => {
  });
});
