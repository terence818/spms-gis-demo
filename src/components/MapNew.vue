<template>
    <div class="js_map">
        <div class="js_map" id="js_map" />
    </div>
</template>

<script>
import Map from "@arcgis/core/Map"
import MapView from "@arcgis/core/views/MapView"
import FeatureLayer from "@arcgis/core/layers/FeatureLayer"
import Color from '@arcgis/core/Color'
// import Graphic from "@arcgis/core/Graphic"
// import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer"
import Home from '@arcgis/core/widgets/Home'
import Expand from '@arcgis/core/widgets/Expand'
// import Legend from '@arcgis/core/widgets/Legend'
import * as esriLang from "@arcgis/core/core/lang.js";
export default {
    name: 'HelloWorld',
    props: {},
    data() {
        return {
            map: null,
            mapView: null,
            colors: ["#ccbba3", "#d3b68a", "#d9b270", "#e0ad57", "#e6a852", "#eca32f", "#f39f1f", "#f99a10", "#ff9500", "#ffae00", "#ffc600", "#ffde00", "#fff700"],
            year: 2020
        }
    },
    async mounted() {
        const vm = this
        const layer = new FeatureLayer({
          title: "Motor vehicle crashes (2020)",
          url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/ArcGIS/rest/services/NYC_motor_crashes/FeatureServer/0",
          popupTemplate: {
            title: "Crash location",
            content: [
              {
                type: "fields",
                fieldInfos: [
                  {
                    fieldName: "CRASH_DATE",
                    label: "Date",
                    dateFormat: "day-short-month-year-long-time"
                  },
                  {
                    fieldName: "NUMBER_OF_PERSONS_KILLED",
                    label: "Fatalities"
                  },
                  {
                    fieldName: "NUMBER_OF_PERSONS_INJURED",
                    label: "Injuries"
                  }
                ]
              }
            ]
          },
          definitionExpression: `CRASH_DATE > Date '12-31-${
            vm.year - 1
          }' AND CRASH_DATE < Date '01-01-${vm.year + 1}'`,
          renderer: {
            type: "heatmap",
            colorStops: vm.createColorStops(vm.colors),
            maxDensity: 0.5,
            minDensity: 0,
            radius: 12,
            referenceScale: 125196
          }
        })
        console.log(layer)
        // this.addHeadMap()
        const map = new Map({
          basemap: "dark-gray-vector",
          layers: [layer],
        });

        const view = new MapView({
          container: "js_map",
          map: map,
          center: [-73.9304, 40.6971],
          scale: 144447,
          constraints: {
            snapToZoom: false,
            maxScale: 33003,
            minScale: 0,
          },
        });
        view.ui.add(
          new Home({
            view: view,
          }),
          "top-left"
        )
        const infoDiv = document.getElementById("infoDiv");
        view.ui.add(
          new Expand({
            view: view,
            content: infoDiv,
            expandIconClass: "esri-icon-layer-list",
            expanded: true,
          }),
          "bottom-left"
        );
    },
    methods: {
        addHeadMap() {
        },
        createColorStops(ramp) {
          const colors = new esriLang.clone(ramp);
          const firstColora = new Color(colors.shift());
          firstColora.a = 0;
          const firstColorb = firstColora.clone();
          firstColorb.a = 0.01;

          const b = colors.length;
          const stops = [
            { color: firstColora, ratio: 0 },
            { color: firstColorb, ratio: 0.01 },
            { color: firstColorb, ratio: 0.01 },
            { color: firstColorb, ratio: 0.01 },
            ...colors.map((c, i) => {
              const ratio = (b - (b - (i + 1))) / b;
              const color = new Color(c);
              color.a = ratio;
              return {
                color,
                ratio,
              };
            }),
          ];
          return stops;
        }
    }
}
</script>

<style scoped>
.js_map {
    height: 100%;
    width: 100%;
}
</style>
<style>
.esri-ui-top-left {
    display: none !important;
}
</style>
