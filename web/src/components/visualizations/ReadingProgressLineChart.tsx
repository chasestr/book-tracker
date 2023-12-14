import { useEffect, useRef, useState } from "react";
import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import * as d3 from "d3";
import variables from "../../variables.module.scss";
import withNoSSR from "../base/NoSSR";

interface ReadingProgressChartProps {
  data: {
    id: number;
    date: string;
    bookId: number;
    userId: number;
    pagesRead?: number | null;
    minutes?: number | null;
  }[];
}

const ReadingProgressLineChart: React.FC<ReadingProgressChartProps> = ({
  data,
}) => {
  const chartRefs = [
    useRef<SVGSVGElement>(null),
    useRef<SVGSVGElement>(null),
    useRef<SVGSVGElement>(null),
  ];
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleTabs, setVisibleTabs] = useState([0, 1, 2]);
  const [selectedTab, setSelectedTab] = useState(0);

  const minimumDataPoints = 10;

  const hasEnoughData = (timePeriod: number) => {
    const endDate = new Date();
    let startDate = new Date();
    if (timePeriod === 0) {
      startDate.setDate(endDate.getDate() - 7);
    } else if (timePeriod === 1) {
      startDate.setMonth(endDate.getMonth() - 1);
    } else {
      startDate.setFullYear(endDate.getFullYear() - 1);
    }

    const filteredData = data
      .map((d) => ({ ...d, date: d3.timeParse("%Y-%m-%d")(d.date)! }))
      .filter((d) => d.date >= startDate && d.date <= endDate && d.pagesRead);

    return filteredData.length > minimumDataPoints;
  };

  const renderChart = (tabIndex: number) => {
    if (
      !chartRefs[tabIndex].current ||
      !containerRef.current ||
      data.length === 0
    )
      return;

    const svg = d3.select(chartRefs[tabIndex].current);

    const margin = { top: 10, right: 10, bottom: 115, left: 140 };

    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;

    const width = containerWidth - margin.left - margin.right;
    const height = containerHeight - margin.top - margin.bottom;

    const parseDate = d3.timeParse("%Y-%m-%d");
    const formatType =
      selectedTab === 0 ? "%a" : selectedTab === 1 ? "%e" : "%b";
    const formatDate = d3.timeFormat(formatType) as (date: Date) => string;

    const endDate = new Date();
    let startDate = new Date();
    if (selectedTab === 0) {
      startDate.setDate(endDate.getDate() - 7);
    } else if (selectedTab === 1) {
      startDate.setMonth(endDate.getMonth() - 1);
    } else {
      startDate.setFullYear(endDate.getFullYear() - 1);
    }

    const filteredData = data
      .map((d) => ({ ...d, date: parseDate(d.date)! }))
      .filter((d) => d.date >= startDate && d.date <= endDate);

    let cumulativePagesRead = 0;
    const cumulativeData = filteredData
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .map((d) => {
        cumulativePagesRead += d.pagesRead || 0;
        return { date: d.date, cumulativePagesRead };
      });
    svg.selectAll("*").remove();

    const chartGroup = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const xScale = d3.scaleTime().range([0, width]);
    const yScale = d3.scaleLinear().range([height, 0]);
    const ticksCount = selectedTab === 0 ? 7 : selectedTab === 1 ? 10 : 12;

    const xAxis = d3
      .axisBottom(xScale)
      .tickFormat((date) => formatDate(date as Date))
      .ticks(ticksCount);
    const yAxis = d3.axisLeft(yScale);

    chartGroup
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis);

    chartGroup.append("g").attr("class", "y-axis").call(yAxis);

    const cumulativeLine = d3
      .line<{ date: Date; cumulativePagesRead: number }>()
      .defined((d) => d.date !== null)
      .x((d) => xScale(d.date) || 0)
      .y((d) => yScale(d.cumulativePagesRead));

    xScale.domain(d3.extent(cumulativeData, (d) => d.date) as [Date, Date]);
    yScale.domain([0, d3.max(cumulativeData, (d) => d.cumulativePagesRead)!]);

    chartGroup.select<SVGGElement>(".x-axis").call(xAxis);
    chartGroup.select<SVGGElement>(".y-axis").call(yAxis);

    chartGroup
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left)
      .attr("x", -height / 2)
      .attr("dy", ".7em")
      .style("text-anchor", "middle")
      .style("fill", variables.white)
      .style("font-size", variables.font_size_xl)
      .text("Total Pages Read");

    const xAxisText =
      selectedTab === 0
        ? "Day of Week"
        : selectedTab === 1
        ? "Day of Month"
        : "Month";

    chartGroup
      .append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 70})`)
      .style("text-anchor", "middle")
      .style("fill", variables.white)
      .style("font-size", variables.font_size_xl)
      .text(xAxisText);

    chartGroup
      .append("path")
      .datum(cumulativeData)
      .attr("class", "cumulative-line")
      .attr("stroke", "orange")
      .attr("stroke-width", 3)
      .attr("fill", "none")
      .attr("d", cumulativeLine);

    d3.selectAll("g.x-axis text")
      .style("fill", variables.white)
      .style("font-size", variables.font_size_l);
    d3.selectAll("g.x-axis line")
      .style("stroke", variables.white)
      .style("stroke-width", 3);
    d3.selectAll("g.x-axis path")
      .style("stroke", variables.white)
      .style("stroke-width", 3);
    d3.selectAll("g.y-axis text")
      .style("fill", variables.white)
      .style("font-size", variables.font_size_l);
    d3.selectAll("g.y-axis line")
      .style("stroke", variables.white)
      .style("stroke-width", 3);
    d3.selectAll("g.y-axis path")
      .style("stroke", variables.white)
      .style("stroke-width", 3);
  };

  useEffect(() => {
    if (
      !chartRefs[selectedTab].current ||
      !containerRef.current ||
      data.length === 0
    )
      return;

    const tabs = [0, 1, 2].filter((timePeriod) => hasEnoughData(timePeriod));
    setVisibleTabs(tabs);

    if (!tabs.includes(selectedTab)) {
      setSelectedTab(tabs[0] || 0);
    }

    renderChart(selectedTab);
  }, [containerRef.current, data, selectedTab]);

  useEffect(() => {
    renderChart(selectedTab);
  }, []);

  return (
    <Flex ref={containerRef} flex={1} direction="column">
      <Tabs
        onChange={(index) => setSelectedTab(visibleTabs[index])}
        index={visibleTabs.indexOf(selectedTab)}
        variant="soft-rounded"
        colorScheme="blackAlpha"
        align="center"
        size={{ base: "sm", sm: "lg", md: "lg", lg: "lg" }}
      >
        <TabList>
          {visibleTabs.map((timePeriod) => (
            <Tab key={timePeriod}>
              {timePeriod === 0
                ? "Past Week"
                : timePeriod === 1
                ? "Past Month"
                : "Past Year"}
            </Tab>
          ))}
        </TabList>
        <TabPanels>
          {visibleTabs.map((timePeriod, index) => (
            <TabPanel
              key={timePeriod}
              bg={variables.light_blue}
              borderRadius={"25px"}
              mt={4}
            >
              <svg
                ref={chartRefs[index]}
                width="90%"
                viewBox={`0 0 ${Math.min(
                  containerRef.current?.clientWidth ?? 0,
                  containerRef.current?.clientHeight ?? 0
                )} ${Math.min(
                  containerRef.current?.clientWidth ?? 0,
                  containerRef.current?.clientHeight ?? 0
                )}`}
              ></svg>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default withNoSSR(ReadingProgressLineChart);
