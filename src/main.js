class WikipediaHelper {
    constructor($input, $searchButton, $articleWrapper) {
        this.$input = $input
        this.$searchButton = $searchButton
        this.$articleWrapper = $articleWrapper
    }
    setListeners() {
        this.$input.keypress(ev => {
            if (ev.which === 13) {
                this.search()
            }
        });
        this.$searchButton.click(() => {
            this.search()
        });
    }
    getSearchQuery() {
        return this.$input.val();
    }
    search() {
        let query = this.getSearchQuery()
        if (query.length > 0) {
            console.log(`SEARCHING: ${query}`)
            fetch(`https://en.wikipedia.org/w/api.php?origin=*&format=json&action=opensearch&list=search&namespace=0&search=${query}&limit=20`)
                .then(resp => resp.json())
                .then(data => this.formatData(data))
                .then(data => this.addCards(data))
                .catch(err => {
                    if (err instanceof Promise) {
                        err.then(err => {
                            toastr.error(`could not execute fetch: ${err}`)
                        })
                    } else {
                        toastr.error(`could not execute fetch: ${err}`)
                    }
                })
        }
    }
    formatData(data) {
        return new Promise(resolve => {
            let formatted = []
            for (var i = 0; i < data[1].length; i++) {
                formatted.push({
                    header: data[1][i],
                    description: data[2][i],
                    URL: data[3][i],
                })
            }
            resolve(formatted)
        })
    }
    addCards(data) {
        return new Promise(resolve => {
            this.$articleWrapper.empty()
            data.map(article => {
                console.log(article)
                this.$articleWrapper.append(`<div class="ui card">
                <div class="content">
                  <div class="ui center aligned header"><a href="${article.URL}" target="_blank" rel="noopener">${article.header}</a></div>
                  <div class="description">
                    <p>${article.description}</p>
                  </div>
                </div>
              </div>`)
            })
        })
    }
}

$(document).ready(() => {
    let wiki = new WikipediaHelper($("#searchInput"), $("#searchButton"), $("#articleWrapper"))
    wiki.setListeners();
});