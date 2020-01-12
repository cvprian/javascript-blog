'use strict';

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

/*Creating new title list*/
const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author';

function generateTitleLinks(customSelector = '') {
    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    let html = '';
    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    for (let article of articles) {
        /* get the article id */
        const articleId = article.getAttribute('id');
        /* find the title element */
        /* get the title from the title element */
        const articleTitle = article.querySelector(optTitleSelector).innerHTML;
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

function generateTags(){
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    /* START LOOP: for every article: */
    for(let article of articles){
      /* find tags wrapper */
        const tagsWrapper = article.querySelector(optArticleTagsSelector);
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
    /* find all links to tags */
    const allLinksToTags = document.querySelectorAll('.post-tags .list a');
    /* START LOOP: for each link */
    for(let oneLink of allLinksToTags){
      /* add tagClickHandler as event listener for that link */
        oneLink.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
    }
  }
  
addClickListenersToTags();

function generateAuthors(){
    const articles = document.querySelectorAll(optArticleSelector);
    for(let article of articles){
      const authorWrapper = article.querySelector(optArticleAuthorSelector);
      let html = '';
      const articleAuthor = article.getAttribute('data-author');
      const linkHTML = '<a href="#author-' + articleAuthor + '">' + articleAuthor + '</a>';
      html = html + linkHTML;
      authorWrapper.innerHTML = html;
      html = '';
    }
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
    for(let oneLink of allLinksToAuthors){
      oneLink.addEventListener('click', authorClickHandler);
    }
  }

addClickListenersToAuthors();


