import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../component/Loader";
import Message from "../component/Message";
import Highcharts from "highcharts";
import axios from "axios";
import { verifyUser } from "../action/userAction";

function HomeScreen(props) {
  // const _verifyUser = useSelector((state) => state.userLogin.verifyUser);
  const [series, setSeries] = useState([

  ]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userLogin);
  const { userInfo, error, loading } = user;
  console.log('userInfo----------------', userInfo)

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };
  useEffect(() => {
    (async function () {
      const { data } = await axios.get(
        "https://data.covid19india.org/v4/min/data.min.json"
      );

      if (data) {
        setSeries([{
          name: "Mumbai",
          data: [
            {
              name: "Confirmed",
              y: data?.MH?.districts?.Mumbai?.delta7?.confirmed,
              color: "#3498db",
            },
            {
              name: "deceased",
              y: data?.MH?.districts?.Mumbai?.delta7?.deceased,
              color: "#9b59b6",
            },
            {
              name: "other",
              y: data?.MH?.districts?.Mumbai?.delta7?.other,
              color: "#2ecc71",
            },
            {
              name: "recovered",
              y: data?.MH?.districts?.Mumbai?.delta7?.recovered,
              color: "#f1c40f",
            },
            {
              name: "vaccinated1",
              y: data?.MH?.districts?.Mumbai?.delta7?.vaccinated1,
              color: "orange",
            },
            {
              name: "vaccinated2",
              y: data?.MH?.districts?.Mumbai?.delta7?.vaccinated2,
              color: "pink",
            },
          ],
        },])
      }

    })();
  }, []);

  // useEffect(() => {
  //   if (props.location.pathname === "/") {
  //     props.history.push("/login");
  //   }
  //   if (_verifyUser) {
  //     props.history.push("/");
  //   }

  // }, [props.history, userInfo, props.location.pathname]);

  const highChartsRender = () => {
    Highcharts.chart({
      chart: {
        type: "pie",
        renderTo: "atmospheric-composition",
      },
      title: {
        verticalAlign: "middle",
        floating: true,
        text: "Current Mumbai Location",
        style: {
          fontSize: "10px",
        },
      },
      plotOptions: {
        pie: {
          dataLabels: {
            format: "{point.name}: {point.percentage:.1f} %",
          },
          innerSize: "70%",
        },
      },
      series: series,
    });
  };

  useEffect(() => {
    if (series) {
      highChartsRender();
    }

  }, [series]);

  return (
    <div>
      <Container>
        <div id="atmospheric-composition"></div>
      </Container>
    </div>
  );
}

export default HomeScreen;
