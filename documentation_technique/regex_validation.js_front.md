### 1. **validateName**

```js
/^[a-zA-ZÀ-ÿ\s]{1,50}$/
```

* `^` → début de la chaîne
* `[a-zA-ZÀ-ÿ\s]` → autorise :

  * `a-z` → lettres minuscules
  * `A-Z` → lettres majuscules
  * `À-ÿ` → lettres accentuées (é, è, ç, ñ, ö, etc.)
  * `\s` → espaces
* `{1,50}` → entre **1 et 50 caractères max**
* `$` → fin de la chaîne

✅ Exemples valides : `"Jean Dupont"`, `"Élodie"`
❌ Invalides : `"Jean123"`, `"Jean_Dupont"`, chaîne vide, plus de 50 caractères

---

### 2. **validateEmail**

```js
/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
```

* `^` → début de la chaîne
* `[\w-]+` → une ou plusieurs lettres, chiffres ou `_` ou `-`
* `(\.[\w-]+)*` → éventuellement des points suivis de lettres/chiffres/`-` (ex : `prenom.nom`)
* `@` → arobase obligatoire
* `([\w-]+\.)+` → une ou plusieurs séquences `texte.` (ex : `gmail.` ou `example.co.`)
* `[a-zA-Z]{2,7}` → extension de domaine avec **2 à 7 lettres** (ex : `.fr`, `.com`, `.school`)
* `$` → fin de la chaîne

✅ Exemples valides : `test@mail.com`, `prenom.nom@example.fr`
❌ Invalides : `test@mail`, `test@.com`, `test@domain.toolongtld`

---

### 3. **validatePassword**

```js
/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
```

* `^` → début de la chaîne
* `(?=.*[A-Za-z])` → doit contenir **au moins une lettre**
* `(?=.*\d)` → doit contenir **au moins un chiffre**
* `[A-Za-z\d]{8,}` → ensuite, uniquement lettres et chiffres, avec **minimum 8 caractères**
* `$` → fin de la chaîne

✅ Exemples valides : `password1`, `Abc12345`
❌ Invalides : `12345678` (pas de lettre), `abcdefgh` (pas de chiffre), `abc!1234` (caractère spécial interdit ici)

---

### 4. **validateStyle**

```js
/^[a-zA-ZÀ-ÿ\s-]{1,50}$/
```

* `^` → début de la chaîne
* `[a-zA-ZÀ-ÿ\s-]` → lettres, accents, espaces et tirets
* `{1,50}` → entre 1 et 50 caractères max
* `$` → fin

✅ Exemples valides : `"Rock"`, `"Hip-Hop"`, `"Chanson française"`
❌ Invalides : `"Techno123"`, `"Rap!"`

---

### 5. **validateText**

Pas une vraie regex complète mais une vérification de contenu.

```js
/[<>]/
```

* Recherche la présence de `<` ou `>`
* Si trouvé → texte invalide (car risque d’injection HTML/XSS).

⚡ Complété par `text.length > maxLength` → limite de caractères.

✅ Exemples valides : `"Super concert !"`, `"C'était génial (200 caractères max)"`
❌ Invalides : `"Hello <script>"`, `"texte de plus de 200 caractères..."`
