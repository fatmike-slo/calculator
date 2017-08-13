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
        let acumulatorArr = [];

        let historyArr = [];
        let trimmed = [];

        let sumSwitch = false;
        let subSwitch = false;
        let productSwitch = false;
        let divSwitch = false;
        let startNegative = false;

        let regexCheckOnlyNum;

        $("#result").val(trimmed + "0");

        function outputValue() {
            if (displayNumArr.length === 1) {
                return displayNumArr[0];
            } else if (displayNumArr.length > 1) {
                return parseInt(displayNumArr.join(""));
            }
        }

        function resetSwitches() {
            // click a number before starting to calculate
            if (displayNumArr.length === 0) {
                sumSwitch = false;
                subSwitch = false;
                productSwitch = false;
                divSwitch = false;
                displayNumArr = [];
            }
        }

        function sum() {
            // ---- sum ----
            if (sumSwitch === true) {

                // start constructing the value array, first item
                if (firstSecondValue.length === 0) {
                    firstSecondValue.push(outputValue());
                }
                // second item
                else if (firstSecondValue.length === 1) {
                    firstSecondValue.push(outputValue());
                    // for repetition, check if the result array is populated, if so replace the value
                    if (acumulatorArr.length === 0) {
                        acumulatorArr.push(firstSecondValue[0] + firstSecondValue[1]);
                        firstSecondValue[0] = acumulatorArr[0];
                        // display the result of the operation
                        $("#result").val(firstSecondValue[0]);
                    }

                }
                // when cicle is completed, we user firstSecondValue[0] as counter and we do replace each iteration the 
                // second argument. The acumulatorArr is here for no purpose ... i guess :D
                else if (firstSecondValue.length === 2) {

                    firstSecondValue.pop();
                    firstSecondValue.push(outputValue());
                    acumulatorArr.pop();
                    acumulatorArr.push(firstSecondValue[0] + firstSecondValue[1]);
                    firstSecondValue[0] = acumulatorArr[0];
                    $("#result").val(firstSecondValue[0]);
                }
            }
        }

        function sub() {
            // ---- sub ----
            if (subSwitch === true) {

                // !prototype!
                // start constructing the value array, first item
                if (firstSecondValue.length === 0) {
                    firstSecondValue.push(outputValue());
                }
                // second item
                else if (firstSecondValue.length === 1) {
                    firstSecondValue.push(outputValue());
                    // for repetition, check if the result array is populated, if so replace the value
                    if (acumulatorArr.length === 0) {
                        acumulatorArr.push(firstSecondValue[0] - firstSecondValue[1]);
                        firstSecondValue[0] = acumulatorArr[0];
                        // display the result of the operation
                        $("#result").val(firstSecondValue[0]);
                    }

                } else if (firstSecondValue.length === 2) {
                    firstSecondValue.pop();
                    firstSecondValue.push(outputValue());
                    acumulatorArr.pop();
                    acumulatorArr.push(firstSecondValue[0] - firstSecondValue[1]);
                    firstSecondValue[0] = acumulatorArr[0];
                    $("#result").val(firstSecondValue[0]);
                }
            }
        }

        // ---- product ----
        function product() {
            if (productSwitch === true) {

                if (firstSecondValue.length === 0) {
                    firstSecondValue.push(outputValue());
                }
                // second item
                else if (firstSecondValue.length === 1) {
                    firstSecondValue.push(outputValue());
                    // for repetition, check if the result array is populated, if so replace the value
                    if (acumulatorArr.length === 0) {
                        acumulatorArr.push(firstSecondValue[0] * firstSecondValue[1]);
                        firstSecondValue[0] = acumulatorArr[0];
                        // display the result of the operation
                        $("#result").val(firstSecondValue[0]);
                    }

                } else if (firstSecondValue.length === 2) {
                    firstSecondValue.pop();
                    firstSecondValue.push(outputValue());
                    acumulatorArr.pop();
                    acumulatorArr.push(firstSecondValue[0] * firstSecondValue[1]);
                    firstSecondValue[0] = acumulatorArr[0];
                    $("#result").val(firstSecondValue[0]);
                }
            }
        }

        // ---- division -----
        function division() {
            if (divSwitch === true) {

                if (firstSecondValue.length === 0) {
                    firstSecondValue.push(outputValue());
                }
                // second item
                else if (firstSecondValue.length === 1) {
                    firstSecondValue.push(outputValue());
                    // for repetition, check if the result array is populated, if so replace the value
                    if (acumulatorArr.length === 0) {
                        acumulatorArr.push(firstSecondValue[0] / firstSecondValue[1]);
                        firstSecondValue[0] = acumulatorArr[0];
                        // display the result of the operation
                        $("#result").val(firstSecondValue[0]);
                    }

                } else if (firstSecondValue.length === 2) {
                    firstSecondValue.pop();
                    firstSecondValue.push(outputValue());
                    acumulatorArr.pop();
                    acumulatorArr.push(firstSecondValue[0] / firstSecondValue[1]);
                    firstSecondValue[0] = acumulatorArr[0];
                    $("#result").val(firstSecondValue[0]);
                }
            }
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
            console.log('acumulatorArr ... rezultat', acumulatorArr);
            console.log('sumSwitch', sumSwitch);
            console.log('subSwitch', subSwitch);
            console.log('productSwitch', productSwitch);
            console.log('divSwitch', divSwitch);
            console.log('startNegative', startNegative);

            console.log('historyArr', historyArr);

        });

        // result button 
        $("#btnResult").on("click", () => {

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
console.log('jmmm');

            // display result & reset view
            $("#result").val(firstSecondValue[0]);
            displayNumArr = [];
            historyArr = [];
            historyArr.push(acumulatorArr[0]);
            firstSecondValue = [];
   
            sumSwitch = false;
            subSwitch = false;
            productSwitch = false;
            divSwitch = false;
            startNegative = false;

            $("#history").val(historyArr);
        });

        // sum button
        $("#btnSum").on("click", () => {
            // activate operator switch
            sumSwitch = true;
            // check if we have another operation pending from before
            if (subSwitch === true) {
                if(historyArr[historyArr.length - 1] === "+") {
                    historyArr.pop();
                    subSwitch = false;
                }
                else {
                    sub();
                    subSwitch = false;
                }

                $("#history").val(trimmed + "+");
            } else if (productSwitch === true) {
                if (historyArr[historyArr.length - 1] === "*") {
                    historyArr.pop();
                    productSwitch = false;
                } else {
                    product();
                    productSwitch = false;
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


                // !! NAREDI if you push twice the current operator, do nothing NAREDI!



                if (historyArr[historyArr.length - 1] === "+") {
                    console.log('triggered');
                    historyArr.pop();

                } else {
                    sum();

                }
            }




            // reset the outputarray
            resetSwitches();
            // display the operator
            historyArr.push("+");
            $("#history").val(trimmed + "+");

        });
        // sub button
        $("#btnMinus").on("click", () => {
            // activate operator switch
            subSwitch = true;
            // check if we have another operation pending             
            if (sumSwitch === true) {
                console.log('sub z sum active');
                sum();
                sumSwitch = false;
            } else if (productSwitch === true) {
                product();
                productSwitch = false;
            } else if (divSwitch === true) {
                division();
                divSwitch = false;
            } else {
                if(historyArr[historyArr.length - 1] === "-") {
                    historyArr.pop();
                }
                else {
                    displayNumArr.length === 0 ? startNegative = true : sub();
                    startNegative = false;
                }
            }
            // perform the the designated operation
            resetSwitches();
            startNegative === true ? historyArr.push("") : historyArr.push("-");
            // put in the display historyArr so we can use it with common buttons to write history
            console.log('sub obicen');
            // check if we start with negative number, if just beginning to use calculator
            // clear the display array
            // end the operations
            $("#history").val(trimmed + "-");
        });

        // product button
        $("#btnProduct").on("click", () => {
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
        });

        // division button
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
        //reset button
        $("#btnReset").on("click", () => {

            displayNumArr = [];
            acumulatorArr = [];
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

        // number buttons
        $("#btnOne").on("click", () => {
            // check if we start with negative number (negative operator activate at the beginning)
            startNegative === true ? displayNumArr.push(-1) : displayNumArr.push(1);
            startNegative = false;
            $("#display").val(displayNumArr.join(""));
            // for displaying the current result anytime
            acumulatorArr.length === 0 ? $("#result").val(displayNumArr.join("")) : $("#result").val(acumulatorArr[0]);
            history();

        });
        $("#btnTwo").on("click", () => {
            startNegative === true ? displayNumArr.push(-2) : displayNumArr.push(2);
            startNegative = false;
            $("#display").val(displayNumArr.join(""));
            // for displaying the current result anytime
            acumulatorArr.length === 0 ? $("#result").val(displayNumArr.join("")) : $("#result").val(acumulatorArr[0]);
            history();

        });
        $("#btnThree").on("click", () => {
            startNegative === true ? displayNumArr.push(-3) : displayNumArr.push(3);
            startNegative = false;
            $("#display").val(displayNumArr.join(""));
            acumulatorArr.length === 0 ? $("#result").val(displayNumArr.join("")) : $("#result").val(acumulatorArr[0]);
            history();
        });
        $("#btnFour").on("click", () => {
            startNegative === true ? displayNumArr.push(-4) : displayNumArr.push(4);
            startNegative = false;
            $("#display").val(displayNumArr.join(""));
            acumulatorArr.length === 0 ? $("#result").val(displayNumArr.join("")) : $("#result").val(acumulatorArr[0]);
            history();
        });
        $("#btnFive").on("click", () => {
            startNegative === true ? displayNumArr.push(-5) : displayNumArr.push(5);
            startNegative = false;
            $("#display").val(displayNumArr.join(""));
            acumulatorArr.length === 0 ? $("#result").val(displayNumArr.join("")) : $("#result").val(acumulatorArr[0]);
            history();
        });
        $("#btnSix").on("click", () => {
            startNegative === true ? displayNumArr.push(-6) : displayNumArr.push(6);
            startNegative = false;
            $("#display").val(displayNumArr.join(""));
            acumulatorArr.length === 0 ? $("#result").val(displayNumArr.join("")) : $("#result").val(acumulatorArr[0]);
            history();
        });
        $("#btnSeven").on("click", () => {
            startNegative === true ? displayNumArr.push(-7) : displayNumArr.push(7);
            startNegative = false;
            $("#display").val(displayNumArr.join(""));
            acumulatorArr.length === 0 ? $("#result").val(displayNumArr.join("")) : $("#result").val(acumulatorArr[0]);
            history();
        });
        $("#btnEight").on("click", () => {
            startNegative === true ? displayNumArr.push(-8) : displayNumArr.push(8);
            startNegative = false;
            $("#display").val(displayNumArr.join(""));
            acumulatorArr.length === 0 ? $("#result").val(displayNumArr.join("")) : $("#result").val(acumulatorArr[0]);
            history();
        });
        $("#btnNine").on("click", () => {
            startNegative === true ? displayNumArr.push(-9) : displayNumArr.push(9);
            startNegative = false;
            $("#display").val(displayNumArr.join(""));
            acumulatorArr.length === 0 ? $("#result").val(displayNumArr.join("")) : $("#result").val(acumulatorArr[0]);
            history();
        });
        $("#btnZero").on("click", () => {
            displayNumArr.push(0);
            $("#display").val(displayNumArr.join(""));
            acumulatorArr.length === 0 ? $("#result").val(displayNumArr.join("")) : $("#result").val(acumulatorArr[0]);
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
                    acumulatorArr.length === 0 ? $("#result").val(displayNumArr.join("")) : $("#result").val(acumulatorArr[0]);
                    history(0)
                }
                // 2
                else if (String.fromCharCode(event.which) === "2") {
                    displayNumArr.push(2);
                    acumulatorArr.length === 0 ? $("#result").val(displayNumArr.join("")) : $("#result").val(acumulatorArr[0]);
                    history(0);

                }
                // 3 
                else if (String.fromCharCode(event.which) === "3") {
                    displayNumArr.push(3);
                    acumulatorArr.length === 0 ? $("#result").val(displayNumArr.join("")) : $("#result").val(acumulatorArr[0]);
                    history(0);
                }
                // 4 
                else if (String.fromCharCode(event.which) === "4") {
                    displayNumArr.push(4);
                    acumulatorArr.length === 0 ? $("#result").val(displayNumArr.join("")) : $("#result").val(acumulatorArr[0]);
                    history(0);
                }
                // 5 
                else if (String.fromCharCode(event.which) === "5") {
                    displayNumArr.push(5);
                    acumulatorArr.length === 0 ? $("#result").val(displayNumArr.join("")) : $("#result").val(acumulatorArr[0]);
                    history(0);
                }
                // 6 
                else if (String.fromCharCode(event.which) === "6") {
                    displayNumArr.push(6);
                    acumulatorArr.length === 0 ? $("#result").val(displayNumArr.join("")) : $("#result").val(acumulatorArr[0]);
                    history(0);
                }
                // 7 
                else if (String.fromCharCode(event.which) === "7") {
                    displayNumArr.push(7);
                    acumulatorArr.length === 0 ? $("#result").val(displayNumArr.join("")) : $("#result").val(acumulatorArr[0]);
                    history(0);
                }
                // 8 
                else if (String.fromCharCode(event.which) === "8") {
                    displayNumArr.push(8);
                    acumulatorArr.length === 0 ? $("#result").val(displayNumArr.join("")) : $("#result").val(acumulatorArr[0]);
                    history(0);
                }
                // 9 
                else if (String.fromCharCode(event.which) === "9") {
                    displayNumArr.push(9);
                    acumulatorArr.length === 0 ? $("#result").val(displayNumArr.join("")) : $("#result").val(acumulatorArr[0]);
                    history(0);
                }
                // 0 
                else if (String.fromCharCode(event.which) === "0") {
                    displayNumArr.push(0);
                    acumulatorArr.length === 0 ? $("#result").val(displayNumArr.join("")) : $("#result").val(acumulatorArr[0]);
                    history(0);
                } else if (String.fromCharCode(event.which) === ",") {
                    displayNumArr = [];
                    acumulatorArr = [];
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
                    acumulatorArr = [];
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