//****************************** Calculator by Stupar Andrej v0.3 *******************************/
// TO DO LIST: 04.08.2017
//
// !!. check what displayHistory does. Fix the sum, historyArray now feed correctly.
//  Lot of bugs, check them, retest everything else
//
//  TO DO... moras zbrisat odvecen operator tudi ko so posamezni switchi teh ugasnjeni
//
//-------------------------------------------------------------------------------------------------
var holder;

function test(text) {
    console.log(text);

}

function add(val) {
    document.getElementById("output").value += val;
}

function reset(val) {
    document.getElementById("output").value = val;
}

function resetOne() {
    holder = document.getElementById("output").value.split("");
    holder.pop();
    document.getElementById("output").value = holder.join("");
}
$(document).ready(() => {

    /* -- test area */
    let kosha = [];
    var string = [1, 2, 3, 4, 5, 6, 7, 8];
    var arr = ["ena", "dva", "tri", "stiri"];
    arr.splice(1, 0, ".");
    console.log('alora', arr);




    /* -- /test area */

    // one day no global variables, try to use closures, oob programming javascript
    let displayNumArr = [];
    let firstSecondValue = [];

    let historyArr = [];
    let trimmed = [];
    let floatArray = [];

    let sumSwitch = false;
    let subSwitch = false;
    let productSwitch = false;
    let divSwitch = false;
    let negateSwitch = false;
    let startNegative = false;

    let accumulator = undefined;
    let reset = false;
    let continueOperation = false;
    let floatSwitch = false;

    let regexCheckOnlyNum;

    $("#result").text(0);

    function outputValue() {
        if (displayNumArr.length === 1) {
            return displayNumArr[0];
        } else if (displayNumArr.length > 1) {
            return parseInt(displayNumArr.join(""));
        }
    }

    function createNumber() {

        if (outputValue() <= 9) {
            // create first val, check if number
            if (firstSecondValue.length === 0 && /\d/g.test(outputValue())) {
                firstSecondValue.push(outputValue());
                // create second val99999999999999999999999999999999999999888888884444444444444444444
            } else if (firstSecondValue.length === 1) {
                firstSecondValue.push(outputValue());
            }
        } else if (outputValue() >= 10) {

            // create first val
            if (firstSecondValue.length === 0 && /\d/g.test(outputValue())) {
                firstSecondValue.push(outputValue());
                // create second val
            } else if (firstSecondValue.length === 1) {
                firstSecondValue.push(outputValue());
            }
        }
    }

    // ------ create float ------------
    // when floatSwitch is on, this function constructs and returns a float number. It is turned of with the switch again
    // function works by immediately creating 2 numbers with a "." The array gets joined, parsed into float and returned  
    function createFloat(num) {
        let output;
        if (floatArray.length === 0) {
            floatArray.push(historyArr[historyArr.length - 1]);
            floatArray.push(".");
            floatArray.push(num);
            output = parseFloat(floatArray[0] + floatArray[1] + floatArray[2]);
        } else {
            floatArray.push(num);
            output = parseFloat(floatArray.join(""));
        }
        return output;
    }
    // ---- calculate with float -----
    function calcFloat(arg) {
        // if float created as first number, add that to the first second array
        if (firstSecondValue.length === 0) {
            firstSecondValue.push(historyArr[0]);
            floatArray = [];
            $("#result").text(firstSecondValue[0]);
        }
        // if we continue float operations, sort by operator
        else if (accumulator !== undefined) {
            console.log('not undefined');
            accumulator = historyArr[historyArr.length - 1];
            if (arg === "+") {
                firstSecondValue[0] = firstSecondValue[0] + accumulator;
            } else if (arg === "-") {
                firstSecondValue[0] = firstSecondValue[0] - accumulator;
            }
            $("#result").text(firstSecondValue[0]);
        } else if (accumulator === undefined) {
            console.log('undefined');

            accumulator = historyArr[historyArr.length - 1];
            if (arg === "+") {
                firstSecondValue[0] = firstSecondValue[0] + accumulator;
            } else if (arg === "-") {
                firstSecondValue[0] = firstSecondValue[0] - accumulator;
            } else if (arg === "*") {
                firstSecondValue[0] = firstSecondValue[0] * accumulator;
            } else if (arg === "/") {
                firstSecondValue[0] = firstSecondValue[0] / accumulator;
            }
            $("#result").text(firstSecondValue[0]);
        }
    }
    // ---- reset -------
    function resetSwitches() {
        // click a number before starting to calculate
        if (displayNumArr.length === 0) {
            sumSwitch = false;
            subSwitch = false;
            productSwitch = false;
            divSwitch = false;
        }
        displayNumArr = [];
    }
    // check if we start with negative number (negative operator activate at the beginning)
    function startNegativeFunction(num) {
        if (startNegative === true) {
            displayNumArr.push(num * -1);
            startNegative = false;
        } else {
            displayNumArr.push(num)
        }
    }
    // after clicking result, if we click another number reset the operations and start over
    function resetAll() {
        if (reset === true) {
            firstSecondValue = [];
            accumulator = undefined;
            historyArr = [];
            resetSwitches();
            reset = false;
            continueOperation = false;
        }
    }
    // ---- sum ----
    function sum() {
        createNumber();
        // when array is populated, replace the first number with argument. Delete the second value
        if (firstSecondValue.length === 2) {
            accumulator = firstSecondValue[0] + firstSecondValue[1];
            firstSecondValue[0] = accumulator;
            firstSecondValue.pop();
        }
        $("#result").text(accumulator);
    }
    // ------sub -------
    function sub() {
        // check if the operator was clicked to signalize an negative number
        if (historyArr.length === 0) {
            console.log('starting negative!');
            startNegative = true;
        }
        createNumber();
        // when array is populated, replace the first number with argument. Delete the second value
        if (firstSecondValue.length === 2) {
            accumulator = firstSecondValue[0] - firstSecondValue[1];
            firstSecondValue[0] = accumulator;
            firstSecondValue.pop();
        }
        $("#result").text(accumulator);
    }

    // ---- product ----
    function product() {
        createNumber();
        // when array is populated, replace the first number with argument. Delete the second value
        if (firstSecondValue.length === 2) {
            accumulator = firstSecondValue[0] * firstSecondValue[1];
            firstSecondValue[0] = accumulator;
            firstSecondValue.pop();
        }
        $("#result").text(accumulator);
    }

    // ---- division -----
    function division() {
        createNumber();
        if (firstSecondValue.length === 2) {
            accumulator = firstSecondValue[0] / firstSecondValue[1];
            firstSecondValue[0] = accumulator;
            firstSecondValue.pop();
        }
        $("#result").text(accumulator);
    }

    function addToHistory(num) {
        console.log(displayNumArr.length);
        

        if (displayNumArr.length === 0) {
            console.log('pjersa');
            
            historyArr.push(num);
            // generate single digit number 0-9
        } else if (displayNumArr.length === 1) {
            console.log('ma kosha');
            
            historyArr.pop();
            historyArr.push(outputValue());
        }
    }
    // build a function that returns the view of the history array feed, apply it to all the event buttons.
    function displayHistory() {
        if (displayNumArr.length === 0) {
            trimmed = historyArr.join("");
            return trimmed;
            // generate single digit number 0-9
        } else if (displayNumArr.length === 1) {

            // check, when starting as negative number, we delete the - to not be displayed
            if (historyArr[0] === "-") {
                historyArr.pop();
            }
            historyArr.push(displayNumArr[0]);
            trimmed = historyArr.join("");
            return trimmed;
            // generate multpile digit numbers
        } else if (displayNumArr.length > 1) {
            historyArr.pop();
            historyArr.push(parseInt(displayNumArr.join("")));
            trimmed = historyArr.join("");

            // 1.000
            if (trimmed.length === 4) {
                var arr = trimmed.split("");
                arr.splice(1, 0, ".");
                console.log('1.000', arr);
                return arr.join("");
            }
            // 10.000
            else if (trimmed.length === 5) {
                var arr = trimmed.split("");
                arr.splice(2, 0, ".")
                console.log('10.000', arr);
                return arr.join("");

            }
            // 100.000
            else if (trimmed.length === 6) {
                var arr = trimmed.split("");
                arr.splice(3, 0, ".");
                console.log('100.000', arr);
                return arr.join("");
            }
            // 1.000.000
            else if (trimmed.length === 7) {
                var arr = trimmed.split("");
                arr.splice(1, 0, ".");
                arr.splice(5, 0, ".");
                console.log('1.000.000', arr);
                return arr.join("");
            }
            // 10.000.000
            else if (trimmed.length === 8) {
                var arr = trimmed.split("");
                arr.splice(2, 0, ".");
                arr.splice(6, 0, ".");
                console.log('10.000.000', arr);
                return arr.join("");
            }
            // 100.000.000
            else if (trimmed.length === 9) {
                var arr = trimmed.split("");
                arr.splice(3, 0, ".");
                arr.splice(7, 0, ".");
                console.log('100.000.000', arr);
                return arr.join("");
            }
            // 1.000.000.000
            else if (trimmed.length === 10) {
                var arr = trimmed.split("");
                arr.splice(1, 0, ".");
                arr.splice(5, 0, ".");
                arr.splice(9, 0, ".");
                console.log('1.000.000.000', arr);
                return arr.join("");
            }
            // 10.000.000.000
            else if (trimmed.length === 11) {
                var arr = trimmed.split("");
                arr.splice(2, 0, ".");
                arr.splice(6, 0, ".");
                arr.splice(10, 0, ".");
                console.log('10.000.000.000', arr);
                return arr.join("");
            }
            // 100.000.000.000
            else if (trimmed.length === 12) {
                var arr = trimmed.split("");
                arr.splice(3, 0, ".");
                arr.splice(7, 0, ".");
                arr.splice(11, 0, ".");
                console.log('100.000.000.000', arr);
                return arr.join("");
            }
            // 1.000.000.000.000
            else if (trimmed.length === 13) {
                var arr = trimmed.split("");
                arr.splice(1, 0, ".");
                arr.splice(5, 0, ".");
                arr.splice(9, 0, ".");
                arr.splice(13, 0, ".");
                console.log('1.000.000.000.000', arr);
                return arr.join("");
            }
            return trimmed;
            // $("#history").text(trimmed);
            // console.log('xxx2', historyArr);
        }


    }


    /************** buttons, click events ****************/


    // temp display array btn
    $("#btnDisplayArray").on("click", () => {
        console.log('------------------------');
        console.log('displayNumArr', displayNumArr);
        console.log('output from outputValue', outputValue());
        console.log('firstSecondValue', firstSecondValue);
        console.log('acumulator', accumulator);
        console.log('startNegative', startNegative);
        console.log('historyArr', historyArr);
        console.log('sumSwitch', sumSwitch);
        console.log('subSwitch', subSwitch);
        console.log('reset', reset);
        console.log('continueOperation', continueOperation);
        console.log('floatSwitch', floatSwitch);
        console.log('floatArray', floatArray);
    });
    // floatSwitch button
    $("#btnFloatSwitch").on("click", () => {
        floatSwitch = true;
        displayNumArr = [];
        $("#result").text(historyArr[historyArr.length - 1] + ",");
        console.log('float switch on');
    });
    // result button 
    $("#btnResult").on("click", () => {
        // naredi tako da razbere kaj je zadnji ali predzadnji operator in konseguentemente operatorsko primerno odreagira :D
        if (historyArr[historyArr.length - 2] === "+") {
            if (floatSwitch === true) {
                calcFloat("+");
                $("#result").text(firstSecondValue[0]);
                $("#history").text(historyArr.join(""));
            } else {
                sum();
                $("#result").text(firstSecondValue[0]);
                $("#history").text(historyArr.join(""));
            }
        } else if (historyArr[historyArr.length - 2] === "-") {
            if (floatSwitch === true) {
                calcFloat("-");
                $("#result").text(firstSecondValue[0]);
                $("#history").text(historyArr.join(""));
            } else {
                sub();
                $("#result").text(firstSecondValue[0]);
                $("#history").text(historyArr.join(""));
            }
        } else if (historyArr[historyArr.length - 2] === "*") {
            if (floatSwitch === true) {
                calcFloat("*");
                $("#result").text(firstSecondValue[0]);
                $("#history").text(historyArr.join(""));
            } else {
                product();
                $("#history").text(historyArr.join(""));
                $("#result").text(firstSecondValue[0]);
            }
        } else if (historyArr[historyArr.length - 2] === "/") {
            if (floatSwitch === true) {
                calcFloat("/");
                $("#result").text(firstSecondValue[0]);
                $("#history").text(historyArr.join(""));
            } else {
                division();
                $("#result").text(firstSecondValue[0]);
                $("#history").text(historyArr.join(""));
            }
        }
        // if we click a number after result, start over. Initiate a trigger that will be checked in the button events
        reset = true;
        // if we want to continue to perform operations after result input
        continueOperation = true;
    });

    // sum button -------------------------------------------------------------------------------
    $("#btnSum").on("click", () => {

        // activate operator switch
        sumSwitch = true;
        // create a float if required ... still to do!
        if (floatSwitch === true) {
            calcFloat("+");
            historyArr.push("+");
            floatArray = [];
            floatSwitch = false;
        }
        // after pressing result, if we want to continue the calculation with the current result  
        if (continueOperation === true) {
            firstSecondValue = [];
            firstSecondValue.push(accumulator);
            historyArr = [];
            historyArr.push(accumulator);
            historyArr.push("+");
            displayNumArr = [];
            continueOperation = false;
            reset = false;
        } else {

            // check if we have another operation pending from before
            if (subSwitch === true) {

                // clean the history from multiple operators if they were clicked. E.g. 2 -+ 3 .. ko se premislimo 
                if (historyArr[historyArr.length - 1] === "-") {
                    historyArr.pop();
                    subSwitch = false;
                } else {
                    sub();
                    subSwitch = false;
                }
                // sum operation pending 
            } else if (productSwitch === true) {
                // clean the history from multiple operators if they were clicked. E.g. 2 -+ 3 .. ko se premislimo 
                if (historyArr[historyArr.length - 1] === "*") {
                    historyArr.pop();
                    productSwitch = false;
                } else {
                    product();
                    productSwitch = false;
                }
            } else if (divSwitch === true) {
                // clean the history from multiple operators if they were clicked. E.g. 2 -+ 3 .. ko se premislimo 
                if (historyArr[historyArr.length - 1] === "/") {
                    historyArr.pop();
                    divSwitch = false;
                } else {
                    division();
                    divSwitch = false;
                }
            } else {
                // if we spam this operator, nothing should happen
                if (historyArr[historyArr.length - 1] === "+") {
                    console.log("spamming +? erasing then");
                    historyArr.pop();
                    // proceed to the operation
                } else {
                    // last check, if we spammed another operator then used this, fix that or if we started with -num
                    if (/\W/g.test(historyArr[historyArr.length - 1])) {
                        // because if we start as a negative number, regex test fails at recogniseing a negative digit
                        if (historyArr[historyArr.length - 1] <= 0) {
                            console.log('doing nothing, we are in a negative number');
                        }
                        // and we have to stop the check if item checked is a float
                        else if (!historyArr[historyArr.length - 1] % 1 === 0) {
                            console.log('or we have negative, float!');

                            historyArr.pop();
                        }
                    }
                    // finally, all is good, do the sum
                    sum();
                }
            }
            historyArr.push("+");
        }
        // reset the outputarray and turn of switches
        resetSwitches();
        displayHistory();
        $("#history").text(historyArr.join(""));
        $("#result").text("");
    });
    // sub button ---------------------------------sub--------------------------------------------
    $("#btnMinus").on("click", () => {
        // activate operator switch
        subSwitch = true;
        // create a float if required ... still to do!
        if (floatSwitch === true) {
            calcFloat("-");

            // review and study  this ...
            historyArr.push("-");
            floatArray = [];
            console.log('floatSwitch off');
            floatSwitch = false;
        }

        // after pressing result, if we want to continue the calculation with the current result  
        if (continueOperation === true) {
            firstSecondValue = [];
            firstSecondValue.push(accumulator);
            historyArr = [];
            historyArr.push(accumulator);
            historyArr.push("-");
            displayNumArr = [];
            continueOperation = false;
            reset = false;
        } else {
            // check if we have another operation pending             
            if (sumSwitch === true) {
                // get rid of surplus + - * on history display and array .. if going from sub to sum for example
                if (historyArr[historyArr.length - 1] === "+") {
                    historyArr.pop();
                    sumSwitch = false;
                } else {
                    sum();
                    sumSwitch = false;
                }
            } else if (productSwitch === true) {
                // get rid of surplus + - * on history display and array .. if going from sub to sum for example
                if (historyArr[historyArr.length - 1] === "*") {
                    historyArr.pop();
                    productSwitch = false;
                } else {
                    product();
                    productSwitch = false;
                }
            } else if (divSwitch === true) {
                division();
                divSwitch = false;
            } else {
                // if we spam this operator, nothing should happen
                if (historyArr[historyArr.length - 1] === "-") {
                    historyArr.pop();
                } else {
                    // last check, if we spammed another operator then used this, fix that or if we started with -num
                    if (/\W/g.test(historyArr[historyArr.length - 1])) {

                        // because if we start as a negative number, regex test fails at recogniseing a negative digit
                        if (historyArr[historyArr.length - 1] <= 0) {

                        }
                        // and we have to stop the check if item checked is a float
                        else if (!historyArr[historyArr.length - 1] % 1 === 0) {
                            historyArr.pop();
                        }
                    }
                    // finally, all is good, do the sum
                    sub();
                }
            }
            historyArr.push("-");
        }
        resetSwitches();
        // put in the display historyArr so we can use it with common buttons to write history
        $("#history").text(displayHistory());
    });

    // product button --------------------------------------------------------------------------------

    $("#btnProduct").on("click", () => {
        productSwitch = true;
        // create a float if required ... still to do!
        if (floatSwitch === true) {
            calcFloat("*");
            // review and study  this ...
            historyArr.push("*");
            floatArray = [];
            console.log('floatSwitch off');
            floatSwitch = false;
        }

        // after pressing result, if we want to continue the calculation with the current result  
        if (continueOperation === true) {
            firstSecondValue = [];
            firstSecondValue.push(accumulator);
            historyArr = [];
            historyArr.push(accumulator);
            historyArr.push("*");
            displayNumArr = [];
            continueOperation = false;
            reset = false;

        } else {

            if (sumSwitch === true) {
                if (historyArr[historyArr.length - 1] === "+") {
                    historyArr.pop();
                    sumSwitch = false;
                } else {
                    sum();
                    sumSwitch = false;
                }
            } else if (subSwitch === true) {
                if (historyArr[historyArr.length - 1] === "-") {
                    historyArr.pop();
                    subSwitch = false;
                } else {
                    sub();
                    subSwitch = false;
                }
            } else if (divSwitch === true) {
                if (historyArr[historyArr.length - 1] === "/") {
                    historyArr.pop();
                    divSwitch = false;
                } else {
                    division();
                    divSwitch = false;
                }
            } else {
                // if we spam this operator, nothing should happen 
                if (historyArr[historyArr.length - 1] === "*") {
                    historyArr.pop();
                } else {
                    // last check, if we spammed another operator then used this, fix that or if we started with -num
                    if (/\W/g.test(historyArr[historyArr.length - 1])) {
                        // because if we start as a negative number, regex test fails at recogniseing a negative digit
                        if (historyArr[historyArr.length - 1] <= 0) {
                            console.log('doing nothing, we are in a negative number');
                        }
                        // and we have to stop the check if item checked is a float
                        else if (!historyArr[historyArr.length - 1] % 1 === 0) {
                            historyArr.pop();
                        }
                    }
                    // finally, all is good, do the sum
                    product();
                }
            }
            historyArr.push("*")
        }
        resetSwitches();
        $("#history").text(displayHistory());
    });

    // division button --------------------------------------------------------------------------------
    $("#btnDivision").on("click", () => {
        divSwitch = true;
        // create a float if required ... still to do!
        if (floatSwitch === true) {
            calcFloat("/");

            // review and study  this ...
            historyArr.push("/");
            floatArray = [];
            console.log('floatSwitch off');
            floatSwitch = false;
        }

        // after pressing result, if we want to continue the calculation with the current result  
        if (continueOperation === true) {
            firstSecondValue = [];
            firstSecondValue.push(accumulator);
            historyArr = [];
            historyArr.push(accumulator);
            historyArr.push("/")
            displayNumArr = [];
            continueOperation = false;
            reset = false;
        } else {

            if (sumSwitch === true) {
                if (historyArr[historyArr.length - 1] === "+") {
                    historyArr.pop();
                    sumSwitch = false;
                } else {
                    sum();
                    sumSwitch = false;
                }
            } else if (subSwitch === true) {
                if (historyArr[historyArr.length - 1] === "-") {
                    historyArr.pop();
                    subSwitch = false;
                } else {
                    sub();
                    subSwitch = false;
                }
            } else if (productSwitch === true) {
                if (historyArr[historyArr.length - 1] === "*") {
                    historyArr.pop();
                    sumSwitch = false;
                } else {
                    product();
                    productSwitch = false;
                }
            } else {
                // if we spam this operator, nothing should happen 
                if (historyArr[historyArr.length - 1] === "/") {
                    historyArr.pop();
                } else {
                    // last check, if we spammed another operator then used this, fix that or if we started with -num
                    if (/\W/g.test(historyArr[historyArr.length - 1])) {
                        // because if we start as a negative number, regex test fails at recogniseing a negative digit
                        if (historyArr[historyArr.length - 1] <= 0) {
                            console.log('doing nothing, we are in a negative number');
                        }
                        // and we have to stop the check if item checked is a float
                        else if (!historyArr[historyArr.length - 1] % 1 === 0) {
                            historyArr.pop();
                        }
                    }
                    // finally, all is good, do the sum
                    division();
                }
            }
            historyArr.push("/")
        }
        resetSwitches();
        $("#history").text(displayHistory());
    });
    // negate button ------------------------------------------------------------------------------
    $("#btnNegate").on("click", () => {
        if (historyArr.length === 1) {
            let holder = parseInt(displayNumArr.join("")) * -1;
            displayNumArr = [];
            displayNumArr.push(holder);
            historyArr[0] *= -1;
        } else {
            historyArr[historyArr.length - 1] *= -1;
            firstSecondValue.push(historyArr[historyArr.length - 1]);
        }
        $("#history").text(historyArr.join(""));
        $("#result").text(historyArr[0]);

    });
    // delete button ------------------------------------------------------------------------------
    $("#btnDelete").on("click", () => {
        historyArr.pop();
        displayNumArr = [];
        $("#result").text(0);
        $("#history").text(historyArr.join(""));
    });

    // reset button --------------------------------------------------------------------------------
    $("#btnReset").on("click", () => {
        accumulator = undefined;
        displayNumArr = [];
        historyArr = [];
        trimmed = [];
        firstSecondValue = [];
        startNegative = false;
        sumSwitch = false;
        subSwitch = false;
        productSwitch = false;
        divSwitch = false;
        floatSwitch = false;
        floatArray = [];
        $("#result").text(displayNumArr + "0");
        $("#history").text(displayHistory() + "0");

    });

    // number buttons--------------------------------------------------------------------------------


    $("#btnOne").on("click", () => {
        console.log('length', displayHistory.length);
        
        // construct a float
        if (floatSwitch === true) {
            let float = createFloat(1);
            $("#result").text(float);
            historyArr.pop();
            historyArr.push(float);
        } else {
            // check if we start with negative number (negative operator activate at the beginning)
            startNegativeFunction(1);
            // for displaying the current result anytime & limit the char quantity
            addToHistory(1);
            // if reset switch is true, reset all
            resetAll();
            $("#result").text(outputValue());
        }
    });
    $("#btnTwo").on("click", () => {

        // construct a float
        if (floatSwitch === true) {
            let float = createFloat(2);
            $("#result").text(float);
            historyArr.pop();
            historyArr.push(float);
        } else {
            // after clicking result, if we click another number reset the operations and start over
            resetAll();
            // check if we start with negative number (negative operator activate at the beginning)
            startNegativeFunction(2);
            // for displaying the current result anytime
            displayHistory();
            $("#result").text(outputValue());

        }
    });
    $("#btnThree").on("click", () => {
        // construct a float
        if (floatSwitch === true) {
            let float = createFloat(3);
            $("#result").text(float);
            historyArr.pop();
            historyArr.push(float);
        } else {
            resetAll();
            // check if we start with negative number (negative operator activate at the beginning)
            startNegativeFunction(3);
            // for displaying the current result anytime
            $("#result").text(outputValue());
            displayHistory();
        }
    });
    $("#btnFour").on("click", () => {
        // construct a float
        if (floatSwitch === true) {
            let float = createFloat(4);
            $("#result").text(float);
            historyArr.pop();
            historyArr.push(float);
        } else {
            resetAll();
            // check if we start with negative number (negative operator activate at the beginning)
            startNegativeFunction(4);
            // for displaying the current result anytime
            $("#result").text(outputValue());
            displayHistory();
        }
    });
    $("#btnFive").on("click", () => {
        // construct a float
        if (floatSwitch === true) {
            let float = createFloat(5);
            $("#result").text(float);
            historyArr.pop();
            historyArr.push(float);
        } else {
            resetAll();
            // check if we start with negative number (negative operator activate at the beginning)
            startNegativeFunction(5);
            // for displaying the current result anytime
            $("#result").text($("#result").text(outputValue()).text().substring(0, 10))
            displayHistory();
        }
    });
    $("#btnSix").on("click", () => {
        // construct a float
        if (floatSwitch === true) {
            let float = createFloat(6);
            $("#result").text(float);
            historyArr.pop();
            historyArr.push(float);
        } else {
            resetAll();
            // check if we start with negative number (negative operator activate at the beginning)
            startNegativeFunction(6);
            // for displaying the current result anytime
            $("#result").text(outputValue());
            displayHistory();
        }
    });
    $("#btnSeven").on("click", () => {
        // construct a float
        if (floatSwitch === true) {
            let float = createFloat(7);
            $("#result").text(float);
            historyArr.pop();
            historyArr.push(float);
        } else {
            resetAll();
            // check if we start with negative number (negative operator activate at the beginning)
            startNegativeFunction(7);
            // for displaying the current result anytime
            $("#result").text(outputValue());
            displayHistory();
        }
    });
    $("#btnEight").on("click", () => {
        // construct a float
        if (floatSwitch === true) {
            let float = createFloat(8);
            $("#result").text(float);
            historyArr.pop();
            historyArr.push(float);
        } else {
            resetAll();
            // check if we start with negative number (negative operator activate at the beginning)
            startNegativeFunction(8);
            // for displaying the current result anytime
            $("#result").text(outputValue());
            displayHistory();
        }
    });
    $("#btnNine").on("click", () => {
        // construct a float
        if (floatSwitch === true) {
            let float = createFloat(9);
            $("#result").text(float);
            historyArr.pop();
            historyArr.push(float);
        } else {
            resetAll();
            // check if we start with negative number (negative operator activate at the beginning)
            startNegativeFunction(9);
            // for displaying the current result anytime
            $("#result").text(outputValue());
            displayHistory();
        }
    });
    $("#btnZero").on("click", () => {
        // construct a float
        if (floatSwitch === true) {
            let float = createFloat(0);
            $("#result").text(float);
            historyArr.pop();
            historyArr.push(float);
        } else {
            resetAll();
            // check if we start with negative number (negative operator activate at the beginning)
            startNegativeFunction(0);
            // for displaying the current result anytime
            $("#result").text(outputValue());
            displayHistory();
        }
    });

    /************** buttons, click events ****************/
    /***********************end***************************/


    /************** keyboard, kepress events ****************/

    $(document).keypress((event) => {
        if (event.which) {
            console.log(event.which);
            var x = String.fromCharCode(event.which)
            console.log(x);

            // 1
            if (String.fromCharCode(event.which) === "1") {
                displayNumArr.push(1);
                history(0)
            }
            // 2
            else if (String.fromCharCode(event.which) === "2") {
                displayNumArr.push(2);
                history(0);

            }
            // 3 
            else if (String.fromCharCode(event.which) === "3") {
                displayNumArr.push(3);
                history(0);
            }
            // 4 
            else if (String.fromCharCode(event.which) === "4") {
                displayNumArr.push(4);
                history(0);
            }
            // 5 
            else if (String.fromCharCode(event.which) === "5") {
                displayNumArr.push(5);
                history(0);
            }
            // 6 
            else if (String.fromCharCode(event.which) === "6") {
                displayNumArr.push(6);
                history(0);
            }
            // 7 
            else if (String.fromCharCode(event.which) === "7") {
                displayNumArr.push(7);
                history(0);
            }
            // 8 
            else if (String.fromCharCode(event.which) === "8") {
                displayNumArr.push(8);
                history(0);
            }
            // 9 
            else if (String.fromCharCode(event.which) === "9") {
                displayNumArr.push(9);
                history(0);
            }
            // 0 
            else if (String.fromCharCode(event.which) === "0") {
                displayNumArr.push(0);
                history(0);
            } else if (String.fromCharCode(event.which) === ",") {
                displayNumArr = [];
                historyArr = [];
                trimmed = [];
                firstSecondValue = [];
                startNegative = false;
                sumSwitch = false;
                subSwitch = false;
                productSwitch = false;
                divSwitch = false;
                $("#result").text(displayNumArr + "0");
                $("#history").text(trimmed + "0");
            }
            // sum
            else if (String.fromCharCode(event.which) === "+") {
                // activate operator switch
                sumSwitch = true;
                // check if we have another operation pending 
                if (subSwitch === true) {
                    sub();
                    subSwitch = false;
                } else if (productSwitch === true) {
                    product();
                    productSwitch = false;
                } else if (divSwitch === true) {
                    division();
                    divSwitch = false;
                } else {
                    sum();
                }

                resetSwitches();
                // display the operator
                $("#display").text(firstSecondValue[0] + " +");
                historyArr.push("+");
                $("#history").text(trimmed + "+");
            }
            // substraction
            else if (String.fromCharCode(event.which) === "-") {
                // activate operator switch
                subSwitch = true;
                // check if we have another operation pending             
                if (sumSwitch === true) {
                    sum();
                    sumSwitch = false;
                } else if (productSwitch === true) {
                    product();
                    productSwitch = false;
                } else if (divSwitch === true) {
                    division();
                    divSwitch = false;
                } else {
                    // check if we start with negative number, if just beginning to use calculator
                    displayNumArr.length === 0 ? startNegative = true : sub();
                }

                resetSwitches();
                startNegative === true ? historyArr.push("") : historyArr.push("-");
                // end the operations
                $("#history").text(trimmed + "-");
            }
            // product
            else if (String.fromCharCode(event.which) === "*") {
                productSwitch = true;
                if (sumSwitch === true) {
                    sum();
                    sumSwitch = false;
                } else if (subSwitch === true) {
                    sub();
                    subSwitch = false;
                } else if (divSwitch === true) {
                    division();
                    divSwitch = false;
                } else {
                    product();
                }
                resetSwitches();
                historyArr.push("*")
                $("#history").text(trimmed + "*");
            }
            // division
            else if (String.fromCharCode(event.which) === "/") {
                divSwitch = true;
                if (sumSwitch === true) {
                    sum();
                    sumSwitch = false;
                } else if (subSwitch === true) {
                    sub();
                    subSwitch = false;
                } else if (productSwitch === true) {
                    product();
                    productSwitch = false;
                } else {
                    division();
                }
                resetSwitches();
                historyArr.push("/")
                $("#history").text(trimmed + "/");
            }

            // result
            else if (event.which === 13) {
                // sum
                if (sumSwitch === true) {
                    // check if we have another operation pending 
                    if (subSwitch === true) {
                        sub();
                        subSwitch = false;
                    } else if (productSwitch === true) {
                        product();
                        productSwitch = false;
                    } else if (divSwitch === true) {
                        division();
                        divSwitch = false;
                    } else {
                        sum();
                        sumSwitch = false;
                    }
                }
                //sub
                else if (subSwitch === true) {
                    // check if we have another operation pending 
                    if (sumSwitch === true) {
                        sum();
                        sumSwitch = false;
                    } else if (productSwitch === true) {
                        product();
                        productSwitch = false;
                    } else if (divSwitch === true) {
                        division();
                        divSwitch = false;
                    } else {
                        sub();
                        subSwitch = false;
                    }
                }
                // product
                else if (productSwitch === true) {
                    if (sumSwitch === true) {
                        sum();
                        sumSwitch = false;
                    } else if (subSwitch === true) {
                        sub();
                        subSwitch = false;
                    } else if (divSwitch === true) {
                        division();
                        divSwitch = false;
                    } else {
                        product();
                        productSwitch = false;
                    }
                }
                // division
                else if (divSwitch === true) {
                    if (sumSwitch === true) {
                        sum();
                        sumSwitch = false;
                    } else if (subSwitch === true) {
                        sub();
                        subSwitch = false;
                    } else if (productSwitch === true) {
                        product();
                        productSwitch = false;
                    } else {
                        division();
                        divSwitch = false;
                    }
                }

                // display result & reset view
                $("#result").text(firstSecondValue[0]);
                displayNumArr = [];
                historyArr = [];
                firstSecondValue = [];
                sumSwitch = false;
                subSwitch = false;
                productSwitch = false;
                divSwitch = false;
                startNegative = false;

                $("#history").text(historyArr);
            }
        }

    });
    /************** buttons, click events ****************/
    /***********************end***************************/

});