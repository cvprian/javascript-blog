'use strict';

const opt = {
    articleSelector: '.post',
    titleSelector: '.post-title',
    titleListSelector: '.titles',
    articleTagsSelector: '.post-tags .list',
    articleAuthorSelector: '.post-author',
    tagsListSelector: '.tags.list',
    cloudClassCount: 5,
    cloudClassPrefix: 'tag-size-',
    authorsListSelector: '.authors'
};

    /*Creating new title list*/
function titleClickHandler(event) {
    event.preventDefault();
    const clickedElement = this;
    /* remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');
    for (let activeLink of activeLinks) {
        activeLink.classList.remove('active');
    }
    /* add class 'active' to the clicked link */
    clickedElement.classList.add('active');
    /* remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts article.active');
    for (let activeArticle of activeArticles) {
        activeArticle.classList.remove('active');
    }
    /* get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
    /* find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    /* add class 'active' to the correct article */
    targetArticle.classList.add('active');
}

function generateTitleLinks(customSelector = '') {
    /* remove contents of titleList */
    const titleList = document.querySelector(opt.titleListSelector);
    titleList.innerHTML = '';
    let html = '';
    /* for each article */
    const articles = document.querySelectorAll(opt.articleSelector + customSelector);
    for (let article of articles) {
        /* get the article id */
        const articleId = article.getAttribute('id');
        /* find the title element */
        /* get the title from the title element */
        const articleTitle = article.querySelector(opt.titleSelector).innerHTML;
        /* create HTML of the link */
        const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
        /* insert link into titleList */
        html = html + linkHTML;
    }
    titleList.innerHTML = html;
    const links = document.querySelectorAll('.titles a');
    for (let link of links) {
        link.addEventListener('click', titleClickHandler);
    }
}

generateTitleLinks();

function calculateTagsParams(tags){
    let params = {
    max: 0,
    min: 999999
  };
    for(let tag in tags){
      if(tags[tag] > params.max){
      params.max = tags[tag];
    } else if(tags[tag] < params.min){
      params.min = tags[tag];
    }
  }
    return params;
}

function calculateTagClass(count, params){
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor(percentage * (opt.cloudClassCount - 1) + 1);
    return opt.cloudClassPrefix + classNumber;
}

function generateTags(){
    let allTags = {}; 
    /* find all articles */
    const articles = document.querySelectorAll(opt.articleSelector);
    /* START LOOP: for every article: */
    for(let article of articles){
      /* find tags wrapper */
        const tagsWrapper = article.querySelector(opt.articleTagsSelector);
      /* make html variable with empty string */
        let html = '';
      /* get tags from data-tags attribute */
        const articleTags = article.getAttribute('data-tags');
      /* split tags into array */
        const articleTagsArray = articleTags.split(' ');
      /* START LOOP: for each tag */
        for(let tag of articleTagsArray){
        /* generate HTML of the link */
            let linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
            if(articleTagsArray.indexOf(tag) != (articleTagsArray.length -1)){
              linkHTML = linkHTML + ', ';
              if(!allTags.hasOwnProperty(tag)){
                allTags[tag] = 1;
              } else {
                allTags[tag]++;
              }
            }
        /* add generated code to html variable */
            html = html + linkHTML;
      /* END LOOP: for each tag */
        }
      /* insert HTML of all the links into the tags wrapper */
        tagsWrapper.innerHTML = html;
        html = '';
    /* END LOOP: for every article: */
    }
    const tagList = document.querySelector('.tags');
    const tagsParams = calculateTagsParams(allTags);
    let allTagsHTML = '';
    for(let tag in allTags){
      const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + '</a></li> ';
      allTagsHTML += tagLinkHTML;
    }
    tagList.innerHTML = allTagsHTML;
  }
  
generateTags();

function tagClickHandler(event){
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    /* find all tag links with class active */
    const activeTags = document.querySelectorAll('a.active');
    /* START LOOP: for each active tag link */
    for(let activeTag of activeTags){
      /* remove class active */
        activeTag.classList.remove('active');
    /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const correctTags = document.querySelectorAll('a[href="' + href + '"]');
    /* START LOOP: for each found tag link */
    for(let correctTag of correctTags){
      /* add class active */
        correctTag.classList.add('active');
    /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }
  
function addClickListenersToTags(){
    const tagsList = document.querySelectorAll('.tags a');
    /* find all links to tags */
    const allLinksToTags = document.querySelectorAll('.post-tags .list a');
    /* START LOOP: for each link */
    for(let oneLink of allLinksToTags){
      /* add tagClickHandler as event listener for that link */
        oneLink.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
    }
    for(let tag of tagsList){
      tag.addEventListener('click', tagClickHandler);
    }
  }
  
addClickListenersToTags();

function generateAuthors(){
    let authors = {};
    const articles = document.querySelectorAll(opt.articleSelector);
    for(let article of articles){
      const authorWrapper = article.querySelector(opt.articleAuthorSelector);
      let html = '';
      const articleAuthor = article.getAttribute('data-author');
      const linkHTML = '<a href="#author-' + articleAuthor + '">' + articleAuthor + '</a>';
      html = html + linkHTML;
      authorWrapper.innerHTML = html;
      html = '';
      if(!authors.hasOwnProperty(articleAuthor)){
        authors[articleAuthor] = 1;
      } else {
        authors[articleAuthor]++;
      }
    }
    const authorList = document.querySelector(opt.authorsListSelector);
    let allAuthorsHTML = '';
    for(let author in authors){
      const authorLinkHTML = '<li><a href="#author-' + author + '">' + author + ' ' + '(' + authors[author] + ')' + '</a></li>';
      allAuthorsHTML += authorLinkHTML;
    }
    authorList.innerHTML = allAuthorsHTML;
  }

generateAuthors();

function authorClickHandler(event){
    event.preventDefault();
    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    const author = href.replace('#author-', '');
    const activeAuthors = document.querySelectorAll('a.active');
    for(let activeAuthor of activeAuthors){
      activeAuthor.classList.remove('active');
    }
    const correctAuthors = document.querySelectorAll('a[href="' + href + '"]');
    for(let correctAuthor of correctAuthors){
      correctAuthor.classList.add('active');
    }
    generateTitleLinks('[data-author="' + author + '"]');
  }

function addClickListenersToAuthors(){
    const allLinksToAuthors = document.querySelectorAll('.post-author a ');
    const allAuthors = document.querySelectorAll('.authors a');
    for(let oneLink of allLinksToAuthors){
      oneLink.addEventListener('click', authorClickHandler);
    }
    for(let oneAuthor of allAuthors){
      oneAuthor.addEventListener('click', authorClickHandler);
    }
  }

addClickListenersToAuthors();


