// Create a window onload function
window.addEventListener('load', function() {
    // Select all the items with the class name toggle
    const toggles = document.getElementsByClassName('toggle');
    // Select all the items with the class name menu
    const menus = document.getElementsByClassName('menu');
    // With toggle 0, add an event listener for a click
    const slide_upper = document.getElementById('upper');
    const slide_lower = document.getElementById('lower');
    const rounded_button = document.querySelector('.rounded-button');
    toggles[0].addEventListener('click', function() {
        // Toogle the class "active" for the menu
        menus[0].classList.toggle('active');
        toggles[0].classList.toggle('active');
    });
    // With toggle 1, add an event listener for a click
    toggles[1].addEventListener('click', function() {
        // Toogle the class "active" for the menu
        menus[1].classList.toggle('active');
        toggles[1].classList.toggle('active');
    });
    var times = 0;

    // Create a function that receives a list of items, and an index
    function toggleActiveWheels(items_a, items_b, index) {
        // Remove all the class "active" in items_a
        for (let i = 0; i < items_a.length; i++) {
            items_a[i].classList.remove('active');
        }
        items_a[index].classList.add('active');
        verifyOtherActive(items_b, index);
    }

    function verifyOtherActive(items_b, index){
        // If the class "active" is in items_b[index]
        // Remove the class active from items_b[index]
        if (items_b[index].classList.contains('active')) {
            items_b[index].classList.remove('active');
        }
    }

    function checkForActiveItem(list1, list2) {
        let activeItemFound1 = false;
        let activeItemFound2 = false;
        for (let i = 0; i < list1.length; i++) {
            if (list1[i].classList.contains('active')) {
                activeItemFound1 = true;
            }
            if (list2[i].classList.contains('active')) {
                activeItemFound2 = true;
            }
        }
        return activeItemFound1 && activeItemFound2;
      }
    
    function checkAndReturn(list1, list2){
        let classActive0='';
        let classActive1='';
        for (let i = 0; i < list1.length; i++) {
            if (list1[i].classList.contains('active')) {
                classActive0 = list1[i].classList[0];
            }
            if (list2[i].classList.contains('active')) {
                classActive1 = list2[i].classList[0];  
            }
        }
        return [classActive0, classActive1];
    }

    function processTable(data) {
        // Paso 1: Agrupar filas por el primer valor en el header
        const header = data.header;
        const firstHeader = header[0];
        const remainingHeaders = header.slice(1);
        const categories = [];
        data.rows.forEach((row) => {
          const categoryValue = row[firstHeader];
          categories.push(categoryValue);
        });
      
        // Paso 2: Crear una lista de objetos usando los elementos restantes del header
        const categoryData = remainingHeaders.map((headerName) => {
          return {
            name: headerName,
            data: data.rows.map((row) => row[headerName]),
          };
        });
      
        return { categories, categoryData };
      }

      function createApexChart_Male(series, x_axis, chart_id) {
        var options = {
          series: series,
          chart: {
            type: 'bar',
            height: 350
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '55%',
              endingShape: 'rounded'
            },
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
          },
          xaxis: {
            categories: x_axis,
          },
          yaxis: {
            title: {
              text:""
            }
          },
          fill: {
            opacity: 1
          },
          tooltip: {
            enabled: false
          }
        };
      
        chart_Male = new ApexCharts(document.querySelector(`#${chart_id}`), options);
        chart_Male.render();
      }      

        function createApexChart_Female(series, x_axis, chart_id) {
            var options = {
                series: series,
                chart: {
                  type: 'bar',
                  height: 350
                },
                plotOptions: {
                  bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    endingShape: 'rounded'
                  },
                },
                dataLabels: {
                  enabled: false
                },
                stroke: {
                  show: true,
                  width: 2,
                  colors: ['transparent']
                },
                xaxis: {
                  categories: x_axis,
                },
                yaxis: {
                  title: {
                    text:""
                  }
                },
                fill: {
                  opacity: 1
                },
                tooltip: {
                  enabled: false
                }
              };
            
              chart_Female = new ApexCharts(document.querySelector(`#${chart_id}`), options);
              chart_Female.render();
            }

    var chart_Female;
    var chart_Male;

    async function checkAndFetch(list1, list2, slider_lower, slider_upper) {
        const lower = slider_lower.value;
        const upper = slider_upper.value;
        if (checkForActiveItem(list1, list2)) {
          const classes = checkAndReturn(list1, list2);
          try {
            const [json_M, json_F] = await Promise.all([
              fetchData(lower, upper, classes[0], classes[1], "_M"),
              fetchData(lower, upper, classes[0], classes[1], "_F")
            ]);
            if (times>0){
                chart_Male.destroy();
                chart_Female.destroy();
            }
            data_male= processTable(json_M);
            data_female= processTable(json_F);
            createApexChart_Male(data_male.categoryData, data_male.categories, "male_chart");
            createApexChart_Female(data_female.categoryData, data_female.categories, "female_chart");
            times=times+1;
          } catch (error) {
            console.error(error);
          }
        }
      }
      
    // Get all the childs of menu 0 that are li
    const menuItems0 = menus[0].getElementsByTagName('li');
    // Get all the childs of menu 1 that are li
    const menuItems1 = menus[1].getElementsByTagName('li');

    // Add event listeners for each item in menuItems0
    for (let i = 0; i < menuItems0.length; i++) {
        menuItems0[i].addEventListener('click', function() {
            // Toggle the class "active" for the menu
            toggleActiveWheels(menuItems0, menuItems1, i);
            checkAndFetch(menuItems0, menuItems1, slide_lower, slide_upper);
        });
    }

    // Add event listeners for each item in menuItems1
    for (let i = 0; i < menuItems1.length; i++) {
        menuItems1[i].addEventListener('click', function() {
            // Toggle the class "active" for the menu
            toggleActiveWheels(menuItems1, menuItems0, i);
            checkAndFetch(menuItems0, menuItems1, slide_lower, slide_upper);
        });
    }

    // Add event listener to rounded button
    rounded_button.addEventListener('click', function() {
        checkAndFetch(menuItems0, menuItems1, slide_lower, slide_upper);
    });

    // Create a function named "fetchData"
    // It has the parameters "lower" and "upper" and "classActive0" and "classActive1"
    async function fetchData(lower, upper, classActive0, classActive1, gender) {
        try {
            const response = await fetch('https://mutex.onrender.com/data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    first: classActive0,
                    second: classActive1,
                    upper: upper,
                    lower: lower,
                    gender: gender,
                })
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }}
});