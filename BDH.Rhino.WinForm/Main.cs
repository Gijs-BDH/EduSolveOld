namespace BDH.Rhino.WinForm
{
    public partial class Main : Form
    {
        public Main()
        {
            InitializeComponent();
        }

        private void buttonExecute_Click(object sender, EventArgs e)
        {
            ExecuteScript();
        }

        private void ExecuteScript()
        {
            var io = new Grasshopper.Kernel.GH_DocumentIO();
            if (io.Open(textBoxScript.Text))
            {
                var doc = io.Document;

                //Set input parameters
                foreach (var obj in doc.Objects)
                {
                    if (obj is Grasshopper.Kernel.Special.GH_Panel paramString)
                    {
                        if (paramString.NickName == textBoxParameterOutputFolderName.Text)
                        {
                            paramString.SetUserText(textBoxParameterOutputFolderValue.Text);
                        }                        
                    }
                    if (obj is Grasshopper.Kernel.Parameters.Param_Point paramPoint)
                    {
                        if (paramPoint.NickName == textBoxParameter1Name.Text)
                        {
                            paramPoint.SetPersistentData(textBoxParameter1Value.Text);
                        }
                        if (paramPoint.NickName == textBoxParameter2Name.Text)
                        {
                            paramPoint.SetPersistentData(textBoxParameter2Value.Text);
                        }
                    }
                }

                doc.NewSolution(true);

                foreach (var obj in doc.Objects)
                {
                    if (obj is Grasshopper.Kernel.IGH_Param param)
                    {
                        if (param.NickName == textBoxOutputNode.Text)
                        {
                            param.CollectData();
                            param.ComputeData();

                            var calculatedData = param.VolatileData.AllData(false);
                            var output = calculatedData.First();
                            break;
                        }
                    }
                }

            }
        }
    }
}
