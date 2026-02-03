namespace BDH.Rhino.WinForm
{
    partial class Main
    {
        /// <summary>
        ///  Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        ///  Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        ///  Required method for Designer support - do not modify
        ///  the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            textBoxScript = new TextBox();
            textBoxParameter1Name = new TextBox();
            textBoxParameter1Value = new TextBox();
            textBoxParameter2Name = new TextBox();
            textBoxParameter2Value = new TextBox();
            label1 = new Label();
            textBoxParameterOutputFolderName = new TextBox();
            textBoxParameterOutputFolderValue = new TextBox();
            buttonExecute = new Button();
            textBoxOutputNode = new TextBox();
            SuspendLayout();
            // 
            // textBoxScript
            // 
            textBoxScript.Anchor = AnchorStyles.Top | AnchorStyles.Left | AnchorStyles.Right;
            textBoxScript.Location = new Point(98, 22);
            textBoxScript.Name = "textBoxScript";
            textBoxScript.Size = new Size(1206, 23);
            textBoxScript.TabIndex = 0;
            textBoxScript.Text = "\\\\fsstp01\\Productivity\\!Producten\\UrbanSolve\\Rhino.Scripts\\01 UrbanSolve\\02 Scope\\01 GH\\20250306_RhinoWeb\\02 Scope\\01 GH\\RhinoComputeTest_Kavel0306_Henro.gh";
            // 
            // textBoxParameter1Name
            // 
            textBoxParameter1Name.Location = new Point(98, 67);
            textBoxParameter1Name.Name = "textBoxParameter1Name";
            textBoxParameter1Name.Size = new Size(100, 23);
            textBoxParameter1Name.TabIndex = 1;
            textBoxParameter1Name.Text = "Crv1_Pt";
            // 
            // textBoxParameter1Value
            // 
            textBoxParameter1Value.Anchor = AnchorStyles.Top | AnchorStyles.Left | AnchorStyles.Right;
            textBoxParameter1Value.Location = new Point(227, 67);
            textBoxParameter1Value.Multiline = true;
            textBoxParameter1Value.Name = "textBoxParameter1Value";
            textBoxParameter1Value.ScrollBars = ScrollBars.Vertical;
            textBoxParameter1Value.Size = new Size(1077, 101);
            textBoxParameter1Value.TabIndex = 2;
            textBoxParameter1Value.Text = "{102.528821, 213.574124, 0}\r\n{108.937658, 153.636639, 0}\r\n{160.494316, 157.206927, 0}\r\n{147.488494, 193.977626, 0}\r\n{102.528821, 213.574124, 0}";
            // 
            // textBoxParameter2Name
            // 
            textBoxParameter2Name.Location = new Point(98, 174);
            textBoxParameter2Name.Name = "textBoxParameter2Name";
            textBoxParameter2Name.Size = new Size(100, 23);
            textBoxParameter2Name.TabIndex = 3;
            textBoxParameter2Name.Text = "Crv2_Pt";
            // 
            // textBoxParameter2Value
            // 
            textBoxParameter2Value.Anchor = AnchorStyles.Top | AnchorStyles.Left | AnchorStyles.Right;
            textBoxParameter2Value.Location = new Point(227, 174);
            textBoxParameter2Value.Multiline = true;
            textBoxParameter2Value.Name = "textBoxParameter2Value";
            textBoxParameter2Value.ScrollBars = ScrollBars.Vertical;
            textBoxParameter2Value.Size = new Size(1077, 118);
            textBoxParameter2Value.TabIndex = 4;
            textBoxParameter2Value.Text = "{171.108394, 160.168886, 0}\r\n{203.042719, 177.769008, 0}\r\n{177.168427, 239.56, 0}\r\n{132.080032, 239.56, 0}\r\n{107.552219, 223.387294, 0}\r\n{156.255623, 202.149446, 0}\r\n{171.108394, 160.168886, 0}";
            // 
            // label1
            // 
            label1.AutoSize = true;
            label1.Location = new Point(12, 25);
            label1.Name = "label1";
            label1.Size = new Size(37, 15);
            label1.TabIndex = 5;
            label1.Text = "Script";
            // 
            // textBoxParameterOutputFolderName
            // 
            textBoxParameterOutputFolderName.Location = new Point(98, 298);
            textBoxParameterOutputFolderName.Name = "textBoxParameterOutputFolderName";
            textBoxParameterOutputFolderName.Size = new Size(100, 23);
            textBoxParameterOutputFolderName.TabIndex = 6;
            textBoxParameterOutputFolderName.Text = "SavePath";
            // 
            // textBoxParameterOutputFolderValue
            // 
            textBoxParameterOutputFolderValue.Anchor = AnchorStyles.Top | AnchorStyles.Left | AnchorStyles.Right;
            textBoxParameterOutputFolderValue.Location = new Point(227, 298);
            textBoxParameterOutputFolderValue.Name = "textBoxParameterOutputFolderValue";
            textBoxParameterOutputFolderValue.Size = new Size(1077, 23);
            textBoxParameterOutputFolderValue.TabIndex = 7;
            textBoxParameterOutputFolderValue.Text = "\\\\fsstp01\\Productivity\\!Producten\\UrbanSolve\\Rhino.Scripts\\01 UrbanSolve\\02 Scope\\01 GH\\20250306_RhinoWeb\\02 Scope\\01 GH\\Export";
            // 
            // buttonExecute
            // 
            buttonExecute.Anchor = AnchorStyles.Top | AnchorStyles.Right;
            buttonExecute.Location = new Point(1229, 368);
            buttonExecute.Name = "buttonExecute";
            buttonExecute.Size = new Size(75, 23);
            buttonExecute.TabIndex = 8;
            buttonExecute.Text = "Execute";
            buttonExecute.UseVisualStyleBackColor = true;
            buttonExecute.Click += buttonExecute_Click;
            // 
            // textBoxOutputNode
            // 
            textBoxOutputNode.Location = new Point(98, 328);
            textBoxOutputNode.Name = "textBoxOutputNode";
            textBoxOutputNode.Size = new Size(100, 23);
            textBoxOutputNode.TabIndex = 9;
            textBoxOutputNode.Text = "OutputFile";
            // 
            // Main
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(1316, 415);
            Controls.Add(textBoxOutputNode);
            Controls.Add(buttonExecute);
            Controls.Add(textBoxParameterOutputFolderValue);
            Controls.Add(textBoxParameterOutputFolderName);
            Controls.Add(label1);
            Controls.Add(textBoxParameter2Value);
            Controls.Add(textBoxParameter2Name);
            Controls.Add(textBoxParameter1Value);
            Controls.Add(textBoxParameter1Name);
            Controls.Add(textBoxScript);
            Name = "Main";
            Text = "Rhino";
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private TextBox textBoxScript;
        private TextBox textBoxParameter1Name;
        private TextBox textBoxParameter1Value;
        private TextBox textBoxParameter2Name;
        private TextBox textBoxParameter2Value;
        private Label label1;
        private TextBox textBoxParameterOutputFolderName;
        private TextBox textBoxParameterOutputFolderValue;
        private Button buttonExecute;
        private TextBox textBoxOutputNode;
    }
}
