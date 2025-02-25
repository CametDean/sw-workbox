import {css, html, LitElement} from 'lit'
import {live} from 'lit/directives/live.js';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class ListeLivre extends LitElement {
    static get properties() {
        return {
            listeLivres: Array,
            listeLivreTrouve: Array,
            searchedValue: Object,
            error: Error,
        }
    }

    constructor() {
        super()
        this.listeLivres = []
        this.listeLivreTrouve = []
        this.searchedValue = {value:'toto'}
    }

    async getLivres() {
        try{
            const resultBrut = await fetch('https://cms-headless-core.ln1.eu/livres')
            return await resultBrut.json()
        } catch (e) {
           throw new Error(e.message)
        }
    }

    async _onClick() {
        try {
            this.error = null
            this.listeLivres = await this.getLivres()
        } catch (e) {
            console.log(e)
            this.error = e
        }
    }

    async rechercheLivre(livreSepareParDesEspaces) {
        const resultBrut = await fetch('https://mon-moteur-de-recherche.ln1.eu/livres?query='+livreSepareParDesEspaces)
        return await resultBrut.json()
    }
    
    async _onSearch(event){
        event.preventDefault()
        console.log(this.searchedValue)
        this.listeLivreTrouve = await this.rechercheLivre('toto')
    }
    
    render() {
        return html`
            <h1>Ma liste de livres</h1>
            <div>
                <form action="" method="post" @submit=${this._onSearch}>
                    <label for="recherche-livre">Rechercher un livre</label>
                    <input type="text" name="recherche" id="recherche-livre" .value=${live(this.searchedValue.value)}>
                    <button type="submit">Rechercher</button>
                </form>
                <div>
                    Résultat de la recherche
                    ${JSON.stringify(this.listeLivreTrouve)}
                </div>
            </div>
            <button id="telecharger-livres" @click=${this._onClick}>Télécharger la liste de livres</button>
            <p>
                ${this.error && this.error.message}
            </p>
            <ul>
                ${this.listeLivres && this.listeLivres.status !== 'KO' && this.listeLivres.map((livre) =>
                        html`
                            <li>
                                <apercu-livre .titre="${livre.titre}"
                                              .couvertureUrl="https://cms-headless-core.ln1.eu${livre.couverture[0].formats.thumbnail.url}"></apercu-livre>
                                <a href="/details/${livre.id}">Details</a>
                            </li>`
                )}
            </ul>
        `
    }

    static get styles() {
        return css`
      :host {
        max-width: 1280px;
        margin: 0 auto;
        padding: 2rem;
        text-align: center;
      }

      a {
        font-weight: 500;
        color: #646cff;
        text-decoration: inherit;
      }
      a:hover {
        color: #535bf2;
      }

      ::slotted(h1) {
        font-size: 3.2em;
        line-height: 1.1;
      }

      button {
        border-radius: 8px;
        border: 1px solid transparent;
        padding: 0.6em 1.2em;
        font-size: 1em;
        font-weight: 500;
        font-family: inherit;
        background-color: #1a1a1a;
        cursor: pointer;
        transition: border-color 0.25s;
      }
      button:hover {
        border-color: #646cff;
      }
      button:focus,
      button:focus-visible {
        outline: 4px auto -webkit-focus-ring-color;
      }

      @media (prefers-color-scheme: light) {
        a:hover {
          color: #747bff;
        }
        button {
          background-color: #f9f9f9;
        }
      }
    `
    }
}

window.customElements.define('liste-livre', ListeLivre)
