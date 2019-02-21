// Line stacked area chart
// ------------------------------
$(window).on("load", function(){

    //Get the context of the Chart canvas element we want to select
    // var ctx = document.getElementById("line-stacked-area").getContext("2d");
    var ctx = $('#line-stacked-area');

    // Chart Options
    var chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
            position: 'bottom',
        },
        hover: {
            mode: 'label'
        },
        scales: {
            xAxes: [{
                display: true,
                gridLines: {
                    color: "#f3f3f3",
                    drawTicks: false,
                },
                scaleLabel: {
                    display: true,
                    labelString: ''
                }
            }],
            yAxes: [{
                display: true,
                gridLines: {
                    color: "#f3f3f3",
                    drawTicks: false,
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Value'
                }
            }]
        },
        title: {
            display: true,
            text: 'Fill Rate'
        }
    };

    // Chart Data
    var total = [];
    var job_title = [];
    var total_dept = [];
    var department = [];
    var total_applied = [];
    var candidate = [];
    var date = ["January",]

    $.ajax({
        type:"get",
        url:"/getJobCount",
        cache:false,
        success:function(result){

            for (var i = 0; i < result.length; i++) {
                job_title.push(result[i]._month);
                total.push(result[i].total);
            }
        }   
    });

    $.ajax({
        type:"get",
        url:"/getAppliedCount",
        cache:false,
        success:function(result){
            for (var i = 0; i < result.length; i++) {
                candidate.push(result[i]._date);
                total_applied.push(result[i].total);
            }
        }   
    });

    var label_data = [
                    {title:'Deployed'},
                    {title:'Resign'},
                    {title:'Total Candidate'},
    ];
    
    var  _months = ["January", "February", "March", "April", "May", "June", "July","August","September","November","December"];

    var data_details = [
        {
        label: label_data[0].title,
        data: total,
        backgroundColor: "rgba(103, 58, 183,.4)",
        borderColor: "transparent",
        pointBorderColor: "#673AB7",
        pointBackgroundColor: "#FFF",
        pointBorderWidth: 2,
        pointHoverBorderWidth: 2,
        pointRadius: 4,
        },

        {   label: label_data[2].title,
            data: total_applied,
            backgroundColor: "rgba(0,188,212,.4)",
            borderColor: "transparent",
            pointBorderColor: "#00BCD4",
            pointBackgroundColor: "#FFF",
            pointBorderWidth: 2,
            pointHoverBorderWidth: 2,
            pointRadius: 4,
        }];

        var chartData = {
            labels:_months,
            datasets: data_details
        };
    

    var config = {
        type: 'line',

        // Chart Options
        options : chartOptions,

        // Chart Data
        data : chartData
    };

    // Create the chart
    var stackedAreaChart = new Chart(ctx, config);
});