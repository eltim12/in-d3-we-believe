AOS.init();

let data = [
    {
        Name: "Iron Man",
        Alignment: "good",
        Intelligence: 100,
        Strength: 85,
        Speed: 58,
        Durability: 85,
        Power: 100,
        Combat: 64,
        Total: 492
    },
    {
        Name: "Hulk",
        Alignment: "good",
        Intelligence: 88,
        Strength: 100,
        Speed: 47,
        Durability: 100,
        Power: 41,
        Combat: 85,
        Total: 461
    },
    {
        Name: "Thor",
        Alignment: "good",
        Intelligence: 69,
        Strength: 100,
        Speed: 92,
        Durability: 100,
        Power: 100,
        Combat: 85,
        Total: 546
    },
    {
        Name: "Captain America",
        Alignment: "good",
        Intelligence: 63,
        Strength: 19,
        Speed: 35,
        Durability: 56,
        Power: 46,
        Combat: 100,
        Total: 319
    },
    {
        Name: "Black Widow",
        Alignment: "good",
        Intelligence: 75,
        Strength: 13,
        Speed: 27,
        Durability: 32,
        Power: 32,
        Combat: 100,
        Total: 279
    },
    {
        Name: "Hawkeye",
        Alignment: "good",
        Intelligence: 50,
        Strength: 12,
        Speed: 23,
        Durability: 14,
        Power: 26,
        Combat: 80,
        Total: 205
    }
]

function init(findData, allHeroesTotal) {
    console.log(findData)

    const width = 930,
        height = 800,
        radius = Math.min(width, height) / 1.9,
        spacing = .09;



    var color = d3.scale.linear()
        .range(["hsl(-180,60%,50%)", "hsl(180,60%,50%)"])
        .interpolate(function (a, b) { var i = d3.interpolateString(a, b); return function (t) { return d3.hsl(i(t)); }; });

    var arcBody = d3.svg.arc()
        .startAngle(0)
        .endAngle(function (d) { return d.value * 2 * Math.PI; })
        .innerRadius(function (d) { return d.index * radius; })
        .outerRadius(function (d) { return (d.index + spacing) * radius; })
        .cornerRadius(6);

    var arcCenter = d3.svg.arc()
        .startAngle(0)
        .endAngle(function (d) { return d.value * 2 * Math.PI; })
        .innerRadius(function (d) { return (d.index + spacing / 2) * radius; })
        .outerRadius(function (d) { return (d.index + spacing / 2) * radius; });

    var svg = d3.select("#svg").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    d3.select(self.frameElement).style("height", height + "px");

    function fieldTransition() {
        var field = d3.select(this).transition();

        field.select(".arc-body")
            .attrTween("d", arcTween(arcBody))
            .style("fill", function (d) { return color(d.value); });

        field.select(".arc-center")
            .attrTween("d", arcTween(arcCenter));

        field.select(".arc-text")
            .text(function (d) { return d.text; });
    }

    function arcTween(arc) {
        return function (d) {
            var i = d3.interpolateNumber(d.previousValue, d.value);
            return function (t) {
                d.value = i(t);
                return arc(d);
            };
        };
    }

    var field = svg.selectAll("g")
        .data(fields)
        .enter().append("g");

    field.append("path")
        .attr("class", "arc-body");

    field.append("path")
        .attr("id", function (d, i) { return "arc-center-" + i; })
        .attr("class", "arc-center");

    field.append("text")
        .attr("dy", ".35em")
        .attr("dx", ".75em")
        .style("text-anchor", "start")
        .append("textPath")
        .attr("startOffset", "50%")
        .attr("class", "arc-text")
        .attr("xlink:href", function (d, i) { return "#arc-center-" + i; });

    tick();

    function tick() {
        if (!document.hidden) field
            .each(function (d) { this._value = d.value; })
            .data(fields)
            .each(function (d) { d.previousValue = this._value; })
            .transition()
            .ease("elastic")
            .duration(500)
            .each(fieldTransition);
    }


    function fields() {
        return [
            { index: .7, text: `Total ${findData.Total}`, value: ((findData.Total * 0.01) * 100) / allHeroesTotal },
            { index: .6, text: `Intelligence ${findData.Intelligence}`, value: ((findData.Intelligence * 0.01) * 100) / 100 },
            { index: .5, text: `Strength ${findData.Strength}`, value: ((findData.Strength * 0.01) * 100) / 100 },
            { index: .3, text: `Speed ${findData.Speed}`, value: ((findData.Speed * 0.01) * 100) / 100 },
            { index: .2, text: `Durability ${findData.Durability}`, value: ((findData.Durability * 0.01) * 100) / 100 },
            { index: .1, text: `Power ${findData.Power}`, value: ((findData.Power * 0.01) * 100) / 100 }
        ];
    }
}


document.getElementById('ironman').onclick = function () {
    event.preventDefault()

    d3.select("svg").remove();

    let findData = data.find(e => {
        return e.Name === 'Iron Man'
    })

    findData.total = findData.Intelligence + findData.Strength + findData.Speed + findData.Durability + findData.Power
    allHeroesTotal = 0
    data.map(e => {
        allHeroesTotal += e.Total
    })
    console.log(allHeroesTotal)
    init(findData, allHeroesTotal)
}

document.getElementById('captain-america').onclick = function () {
    event.preventDefault()

    d3.select("svg").remove();

    let findData = data.find(e => {
        return e.Name === 'Captain America'
    })

    findData.total = findData.Intelligence + findData.Strength + findData.Speed + findData.Durability + findData.Power
    allHeroesTotal = 0
    data.map(e => {
        allHeroesTotal += e.Total
    })
    init(findData, allHeroesTotal)
}

document.getElementById('thor').onclick = function () {
    event.preventDefault()

    d3.select("svg").remove();

    let findData = data.find(e => {
        return e.Name === 'Thor'
    })

    findData.total = findData.Intelligence + findData.Strength + findData.Speed + findData.Durability + findData.Power
    allHeroesTotal = 0
    data.map(e => {
        allHeroesTotal += e.Total
    })
    init(findData, allHeroesTotal)
}

document.getElementById('black-widow').onclick = function () {
    event.preventDefault()

    d3.select("svg").remove();

    let findData = data.find(e => {
        return e.Name === 'Black Widow'
    })

    findData.total = findData.Intelligence + findData.Strength + findData.Speed + findData.Durability + findData.Power
    allHeroesTotal = 0
    data.map(e => {
        allHeroesTotal += e.Total
    })
    init(findData, allHeroesTotal)
}

document.getElementById('ronin').onclick = function () {
    event.preventDefault()

    d3.select("svg").remove();

    let findData = data.find(e => {
        return e.Name === 'Hawkeye'
    })

    findData.total = findData.Intelligence + findData.Strength + findData.Speed + findData.Durability + findData.Power
    allHeroesTotal = 0
    data.map(e => {
        allHeroesTotal += e.Total
    })
    init(findData, allHeroesTotal)
}

document.getElementById('hulk').onclick = function () {
    event.preventDefault()

    d3.select("svg").remove();

    let findData = data.find(e => {
        return e.Name === 'Hulk'
    })

    findData.total = findData.Intelligence + findData.Strength + findData.Speed + findData.Durability + findData.Power
    allHeroesTotal = 0
    data.map(e => {
        allHeroesTotal += e.Total
    })
    init(findData, allHeroesTotal)
}