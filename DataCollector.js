import mock from "./components/mock/mock"

const DataCollector = async (data) => {
    setInterval(function() {
        mock.increment();
    }, 1000)
}

export default DataCollector;