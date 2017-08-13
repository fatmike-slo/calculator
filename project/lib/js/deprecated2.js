    //****************************** Calculator by Stupar Andrej *******************************/
    // 1. we create functions for each operator to get the values for further processing and to turn on or off the operators switches 
    // 2. the main processing will be in one result function. Via switches each operator will have his own processing
    // 3. the accumulating value from the operations will be stored in an processing array

    // note: jQuery required

    $(document).ready(() => {

        /* -- test area */





        /* -- /test area */


        let displayNumArr = [];
        let firstSecondValue = [];

        let historyArr = [];
        let trimmed = [];

        let sumSwitch = false;
        let subSwitch = false;
        let productSwitch = false;
        let divSwitch = false;
        let startNegative = false;

        let accumulator = 0;



        let regexCheckOnlyNum;

        $("#result").val(accumulator);

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
                    console.log('dodam eno, firstVal');
                    // create second val
                } else if (firstSecondValue.length === 1) {
                    firstSecondValue.push(outputValue());
                    console.log('dodam eno, secondVal');
                }
            }
            if (outputValue() >= 10) {
                // create first val
                if (firstSecondValue.length === 0 && /\d/g.test(outputValue())) {
                    firstSecondValue.push(outputValue());
                    console.log('dodam vec, firstVal');
                    // create second val
                } else if (firstSecondValue.length === 1) {
                    firstSecondValue.push(outputValue());
                    console.log('dodam vec, secondVal');
                }
            }
        }

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

        function sum() {
            // populate the array

            createNumber();
            // when array is populated, replace the first number with argument. Delete the second value
            if (firstSecondValue.length === 2) {
                accumulator = firstSecondValue[0] + firstSecondValue[1];
                firstSecondValue[0] = accumulator;
                firstSecondValue.pop();
            }
            // ---- sum ----
            $("#result").val(accumulator);
        }

        function sub() {
            
            if(historyArr.length === 0) {
            console.log('kosha');
                startNegative = true;
            }     
            // populate the array
            createNumber();
            if (firstSecondValue.length === 2) {
                accumulator = firstSecondValue[0] - firstSecondValue[1];
                firstSecondValue[0] = accumulator;
                firstSecondValue.pop();
            }
            $("#result").val(accumulator);
        }

        // ---- product ----
        function product() {
            // populate the array
            createNumber();
            if (firstSecondValue.length === 2) {
                accumulator = firstSecondValue[0] * firstSecondValue[1];
                firstSecondValue[0] = accumulator;
                firstSecondValue.pop();
            }
            $("#result").val(accumulator);
        }

        // ---- division -----
        function division() {
            // populate the array
            createNumber();
            if (firstSecondValue.length === 2) {
                accumulator = firstSecondValue[0] / firstSecondValue[1];
                firstSecondValue[0] = accumulator;
                firstSecondValue.pop();
            }
            $("#result").val(accumulator);
        }

        function history() {
            if (displayNumArr.length === 1) {
                historyArr.push(displayNumArr);
                trimmed = historyArr.join("");
                $("#history").val(trimmed);

            } else if (displayNumArr.length > 1) {
                historyArr.pop();
                historyArr.push([parseInt(displayNumArr.join(""))]);
                trimmed = historyArr.join("");
                $("#history").val(trimmed);
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

        });

        // result button 
        $("#btnResult").on("click", () => {
            // check if we pressed operator but want to end
            if (/\W/g.test(historyArr[historyArr.length - 1])) {
                historyArr.pop();
            }
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
            $("#result").val(accumulator);
            displayNumArr = [];
            historyArr = [];
            firstSecondValue = [];

            sumSwitch = false;
            subSwitch = false;
            productSwitch = false;
            divSwitch = false;
            startNegative = false;

            $("#history").val(historyArr);
        });

        // sum button -------------------------------------------------------------------------------
        $("#btnSum").on("click", () => {
            // activate operator switch
            sumSwitch = true;
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
                $("#history").val(trimmed + "+");
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
                // sum operation pending                 
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
                // clean the history from multiple operators if they were clicked. E.g. 2 -+ 3 .. ko se premislimo 
                if (historyArr[historyArr.length - 1] === "+") {
                    historyArr.pop();
                } else {
                    // finally, if all is good, do the sum
                    sum();
                }
            }// get rid of surplus + - * on history display and array .. if going from sub to sum for example
            // if (/\W/g.test(historyArr[historyArr.length - 1])) {
            //     historyArr.pop();
            // }
            historyArr.push("+");
            // reset the outputarray and turn of switches
            resetSwitches();
            // display the operator
            $("#history").val(trimmed + "+");

        });
        // sub button ---------------------------------sub--------------------------------------------
        $("#btnMinus").on("click", () => {
            // activate operator switch
            subSwitch = true;
            // check if we have another operation pending             
            if (sumSwitch === true) {
            // get rid of surplus + - * on history display and array .. if going from sub to sum for example
                if (historyArr[historyArr.length - 1] === "+") {
                    console.log('ooola');
                    
                    historyArr.pop();
                    historyArr.push("-");
                    sumSwitch = false;
                } else {
                    sum();
                    sumSwitch = false;
                }
            } else if (productSwitch === true) {
                product();
                productSwitch = false;
            } else if (divSwitch === true) {
                division();
                divSwitch = false;
            } else {
                // subtraction 
                if (historyArr[historyArr.length - 1] === "-") {
                    historyArr.pop();
                } else {
                    sub();
                }
            }
            // for display check if there are double operator symbols 
            // if (/\W/g.test(historyArr[historyArr.length - 1])) {
            //     historyArr.pop();
            // }
            // reset the outputarray and turn of switches
            resetSwitches();
            // put in the display historyArr so we can use it with common buttons to write history
            $("#history").val(trimmed + "-");
        });

        // product button --------------------------------------------------------------------------------

        $("#btnProduct").on("click", () => {
            productSwitch = true;
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
                $("#history").val(trimmed + "+");
                // sum operation pending 
            } else if (sumSwitch === true) {
                if (historyArr[historyArr.length - 1] === "*") {
                    historyArr.pop();
                    sumSwitch = false;
                } else {
                    sum();
                    sumSwitch = false;
                }
                // sum operation pending                 
            } else if (divSwitch === true) {
                if (historyArr[historyArr.length - 1] === "/") {
                    historyArr.pop();
                    divSwitch = false;
                } else {
                    division();
                    divSwitch = false;
                }
            } else {
                // if + is pressed multiple times without value, do nothing
                if (historyArr[historyArr.length - 1] === "*") {
                    historyArr.pop();
                } else {
                    // finally, if all is good, do the sum
                    product();
                }
            }
            if (/\W/g.test(historyArr[historyArr.length - 1])) {
                historyArr.pop();
            }
            historyArr.push("*");
            // reset the outputarray and turn of switches
            resetSwitches();
            // display the operator
            $("#history").val(trimmed + "*");
        });

        // division button --------------------------------------------------------------------------------
        $("#btnDivision").on("click", () => {
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
            $("#history").val(trimmed + "/");
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
            $("#result").val(displayNumArr + "0")
            $("#history").val(trimmed + "0");

        });

        // number buttons--------------------------------------------------------------------------------

        $("#btnOne").on("click", () => {
            // check if we start with negative number (negative operator activate at the beginning)
            startNegative === true ? displayNumArr.push(-1) : displayNumArr.push(1);
            startNegative = false;
            // for displaying the current result anytime
            $("#result").val(accumulator);
            history();

        });
        $("#btnTwo").on("click", () => {
            startNegative === true ? displayNumArr.push(-2) : displayNumArr.push(2);

            startNegative = false;
            // for displaying the current result anytime
            $("#result").val(accumulator);
            history();

        });
        $("#btnThree").on("click", () => {
            startNegative === true ? displayNumArr.push(-3) : displayNumArr.push(3);
            startNegative = false;
            $("#result").val(accumulator);
            history();
        });
        $("#btnFour").on("click", () => {
            startNegative === true ? displayNumArr.push(-4) : displayNumArr.push(4);
            startNegative = false;
            $("#result").val(accumulator);
            history();
        });
        $("#btnFive").on("click", () => {
            startNegative === true ? displayNumArr.push(-5) : displayNumArr.push(5);
            startNegative = false;
            $("#display").val(displayNumArr.join(""));
            history();
        });
        $("#btnSix").on("click", () => {
            startNegative === true ? displayNumArr.push(-6) : displayNumArr.push(6);
            startNegative = false;
            $("#display").val(displayNumArr.join(""));
            history();
        });
        $("#btnSeven").on("click", () => {
            startNegative === true ? displayNumArr.push(-7) : displayNumArr.push(7);
            startNegative = false;
            $("#display").val(displayNumArr.join(""));
            history();
        });
        $("#btnEight").on("click", () => {
            startNegative === true ? displayNumArr.push(-8) : displayNumArr.push(8);
            startNegative = false;
            $("#display").val(displayNumArr.join(""));
            history();
        });
        $("#btnNine").on("click", () => {
            startNegative === true ? displayNumArr.push(-9) : displayNumArr.push(9);
            startNegative = false;
            $("#display").val(displayNumArr.join(""));
            history();
        });
        $("#btnZero").on("click", () => {
            displayNumArr.push(0);
            $("#display").val(displayNumArr.join(""));
            history();
        });

        /************** buttons, click events ****************/
        /***********************end***************************/


        /************** keyboar, kepress events ****************/

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
                    $("#result").val(displayNumArr + "0");
                    $("#history").val(trimmed + "0");
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
                    $("#display").val(firstSecondValue[0] + " +");
                    historyArr.push("+");
                    $("#history").val(trimmed + "+");
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
                    $("#history").val(trimmed + "-");
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
                    $("#history").val(trimmed + "*");
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
                    $("#history").val(trimmed + "/");
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
                    $("#result").val(firstSecondValue[0]);
                    displayNumArr = [];
                    historyArr = [];
                    firstSecondValue = [];
                    sumSwitch = false;
                    subSwitch = false;
                    productSwitch = false;
                    divSwitch = false;
                    startNegative = false;

                    $("#history").val(historyArr);
                }
            }

        });
        /************** buttons, click events ****************/
        /***********************end***************************/

    });