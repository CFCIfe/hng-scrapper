import { Injectable } from '@nestjs/common';
import { InjectBrowser, InjectPage } from 'nestjs-puppeteer';
import { Browser, Page } from 'puppeteer';

// Define return type
type EbayOutput = {
  title: string;
  price: string;
  url: string;
  sold: string;
};

@Injectable()
export class AppService {
  constructor(
    @InjectBrowser() private readonly browser: Browser,
    @InjectPage('page1') private readonly page1: Page,
  ) {}

  async scrapeEbayUrl(): Promise<any> {
    // Open eBay search for Samsung galaxy S20
    const url: string =
      'https://www.ebay.com/sch/i.html?_from=R40&_trksid=p4432023.m570.l1311&_nkw=samsung+galaxy+s20&_sacat=0';

    await this.page1.goto(url, {
      waitUntil: 'domcontentloaded',
      timeout: 4 * 60 * 1000,
    });

    const priceSelector: string = '.s-item__price';
    const titleSelector: string = '.s-item__title';
    const urlSelector: string = '.s-item__link';
    const soldSelector: string = '.s-item__quantitySold';

    const prices: string[] = await this.page1.$$eval(
      priceSelector,
      (elements) => elements.map((el) => el.textContent),
    );

    const titles: string[] = await this.page1.$$eval(
      titleSelector,
      (elements) => elements.map((el) => el.textContent),
    );

    const urls: string[] = await this.page1.$$eval(urlSelector, (elements) =>
      elements.map((el) => el.textContent),
    );
    const sold: string[] = await this.page1.$$eval(soldSelector, (elements) =>
      elements.map((el) => el?.textContent),
    );

    const products: EbayOutput[] = [];

    for (let i = 0; i < 10; i++) {
      products.push({
        title: titles[i],
        price: prices[i],
        url: urls[i],
        sold: sold[i],
      });
    }

    return products;
  }
}
