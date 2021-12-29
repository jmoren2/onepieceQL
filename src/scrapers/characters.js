import { load as _load } from 'cheerio';
import { get } from 'axios';
import ObjectsToCsv from 'objects-to-csv';

const URLS = {
    BASE_URL: 'https://onepiece.fandom.com',
    ALL_CHARACTERS: '/wiki/List_of_Canon_Characters'
}

const characterInfo = [];
 
const fetch = async url => {
    const { data } = await get(url);
    return _load(data);
};

const loadNames = async () => {
    const response = await Promise.resolve(fetch(URLS.BASE_URL + URLS.ALL_CHARACTERS));
    const $ = response;

    $('table tr').each( function(i, elem) {
        var element = $(this).find("td:nth-child(2)")
        var name = element.text().replace(/(\r\n|\n|\r)/gm, "");
        var href = $(elem).find('a').attr('href')
        if(name) {
            const toPush = {
                Name: name.split(' (')[0],
                Link: href
            }
            characterInfo.push(toPush);
        } 
    })    
}

const loadDescriptions = async () => {
    for(const [index, item] of characterInfo.entries() )
    { 
        if(item.Link)
        {
            const response = await Promise.resolve(fetch(URLS.BASE_URL + item.Link));
            const $ = response;
    
            var desc = $('#mw-content-text > div > p:nth-child(4)').text();

            if(desc)
            {
                characterInfo[index]['Description'] = desc;
            }
        }
    }
}

const loadCharacters = async () => {
    await loadNames();
    await loadDescriptions()
    new ObjectsToCsv(characterInfo).toDisk('./chracters.csv', {
      allColumns: true,
    });
};

loadCharacters();
