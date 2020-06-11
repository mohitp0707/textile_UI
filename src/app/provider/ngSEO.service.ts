import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

 
@Injectable()
 
export class ngSEO {
	
  private titleService: Title;
  private headElement: Element;
  private metaDescription: Element;
  private metaKeyword: Element;
  
  private robots: Element;
  private DOM: any;

  constructor(titleService: Title ){
    this.titleService = titleService;
	
    this.headElement = document.querySelector('head');
    this.metaDescription = this.getOrCreateMetaElement('description');
    this.metaKeyword = this.getOrCreateMetaElement('keywords');
    this.robots = this.getOrCreateMetaElement('robots');
  }
 
  public getTitle(): string {
    return this.titleService.getTitle();
  }
 
  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
 
  public getMetaDescription(): string {
    return this.metaDescription.getAttribute('content');
  }
 
  public setMetaDescription(description: string) {
    this.metaDescription.setAttribute('content', description);
  }
 
  public getMetaKeywords(): Array<string> {
    return this.metaKeyword.getAttribute('content').split(",");
  }
 
  public setMetaKeywords(keywords: Array<string>) {
    this.metaKeyword.setAttribute('content', keywords.join(","));
  }
 
  public getMetaRobots(): string {
    return this.robots.getAttribute('content');
  }
 
  public setMetaRobots(robots: string) {
    this.robots.setAttribute('content', robots);
  }
 
   /**
    * get the HTML Element when it is in the markup, or create it.
    * @param name
    * @returns {HTMLElement}
    */
    private getOrCreateMetaElement(name: string): Element {
      let el: Element;
      el = document.querySelector('meta[name=' + name + ']');
      if (el === null) {
        el = document.createElement('meta');
        el.setAttribute('name', name);
        this.headElement.appendChild(el);
      }
      return el;
    }
 
}