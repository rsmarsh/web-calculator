# web-calculator

This project features a web-based calculator, allowing the calculation of simple maths questions.  
 The following features are included:
- Answers any maths sum entered via the interface.
- Allows addition, subtraction, division, multiplication of any two whole or decimal numbers.
- Save sums and answers to an external csv file.
- Retrieve a list of all saved calculatons and metadata by visiting `/Calculations.php`.


## Usage

### Live Demo (has no saving functionality):
[Web Calculator Demo - Netlify](https://www.google.com)


### Self Hosting

The simplest method of running the web calculator locally is to use PHP's built in web-server.  

To use the PHP server, begin by installing PHP on your machine. Open a command prompt in the root of the /web-calculator directory and enter the following command:  
`php -S 127.0.0.1:8080`

Once running, navigate to `http://localhost:8080` within any web browser to access the Web Calculator.

----

## Compiling
If you wish to recompile the project, there is a gulp config file featuring tasks to both compile the SCSS into CSS, and transpile the JavaScript into ES5.  These tasks can be easily run by entering any of the following into the terminal:
- `npm run build` - to transpile the JavaScript
- `npm run sass` - to compile the SCSS files into CSS
- `npm run watch` - to monitor the files and run the relevent task upon each saved change

## Technology Stack
The calculator was built using the following languages:
- HTML
- SASS/SCS
- ES6+ JavaScript
- PHP 7.4
- Gulp
- Babel 
- Browseify


## Future additions
- Multi-operator BODMAS support
- Backspace button
- Scientific functions
- Numpad support
- Float rounding error improvements