<?xml version="1.0" encoding="ISO-8859-1"?>
<!-- Edited by XMLSpy® -->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:param name="message"></xsl:param>

<xsl:variable name="lcletters">abcdefghijklmnopqrstuvwxyz</xsl:variable>
<xsl:variable name="ucletters">ABCDEFGHIJKLMNOPQRSTUVWXYZ</xsl:variable>

<xsl:template match="catalog">
    <xsl:apply-templates select="recepies/recipe[id=$message]" mode="normal" />
</xsl:template>

<xsl:template match="recipe" mode="normal" >
    <ul id="quantities" class="quantities">
        <lu class="quantities">
            <p id="ldl-weight" class="lbl">Peso</p>
            <xsl:element name="input">
                <xsl:attribute name="id">weight</xsl:attribute>
                <xsl:attribute name="type">number</xsl:attribute>
                <xsl:attribute name="class">quantity</xsl:attribute>
                <xsl:attribute name="unit">g</xsl:attribute>
                <xsl:attribute name="digit">0</xsl:attribute>
                <xsl:attribute name="value">
                    <xsl:value-of select="standard-weight"/>
                </xsl:attribute>
                <xsl:attribute name="onchange">weightUpdate()</xsl:attribute>
            </xsl:element>
        </lu>
        <lu class="quantities">
                <p id="ldl-qty" class="lbl">Quantita'</p>
                <xsl:element name="input">
                    <xsl:attribute name="id">qty</xsl:attribute>
                    <xsl:attribute name="type">number</xsl:attribute>
                    <xsl:attribute name="class">quantity</xsl:attribute>
                    <xsl:attribute name="unit"></xsl:attribute>
                    <xsl:attribute name="digit">1</xsl:attribute>
                    <xsl:attribute name="value">
                        <xsl:value-of select="standard-qty"/>
                    </xsl:attribute>
                    <xsl:attribute name="onchange">qtyUpdate()</xsl:attribute>
                </xsl:element>
        </lu>
        <lu class="quantities">
                <p id="ldl-wpu" class="lbl">Peso per unita'</p>
                <xsl:element name="input">
                    <xsl:attribute name="id">wpu</xsl:attribute>
                    <xsl:attribute name="type">number</xsl:attribute>
                    <xsl:attribute name="class">quantity</xsl:attribute>
                    <xsl:attribute name="unit">g</xsl:attribute>
                    <xsl:attribute name="digit">2</xsl:attribute>
                    <xsl:attribute name="disabled">disabled</xsl:attribute>
                    <xsl:attribute name="value">
                        <xsl:value-of select="weight-per-unit"/>
                    </xsl:attribute>
                </xsl:element>
        </lu>
    </ul>
    <ul id="ingredients">
        <xsl:apply-templates select="ingredient" mode="normal" />
    </ul>
</xsl:template>

<xsl:template match="ingredient" mode="normal" >
    <xsl:element name="lu">
        <xsl:variable name="ingname">ing<xsl:value-of select="position()" /></xsl:variable>
        <xsl:attribute name="class">ingredient</xsl:attribute>
        <xsl:attribute name="id"><xsl:value-of select="$ingname"/></xsl:attribute>
        <!-- Is there a flavor attribute? -->
        <xsl:choose>
          <xsl:when test="@storeid">
            <xsl:variable name="storeid"><xsl:value-of select="@storeid"/></xsl:variable>
            <xsl:apply-templates select="/catalog/store/product[id=$storeid]" mode="normal" />
            <xsl:element name="input">
                <xsl:attribute name="id"><xsl:value-of select="$ingname"/>-perc</xsl:attribute>
                <xsl:attribute name="class">perc</xsl:attribute>
                <xsl:attribute name="type">hidden</xsl:attribute>
                <xsl:attribute name="value">
                    <xsl:value-of select="percent"/>
                </xsl:attribute>
            </xsl:element>
            <xsl:element name="input">
                <xsl:attribute name="id"><xsl:value-of select="$ingname"/>-weight</xsl:attribute>
                <xsl:attribute name="class">weight</xsl:attribute>
                <xsl:attribute name="unit"><xsl:value-of select="/catalog/store/product[id=$storeid]/unit"/></xsl:attribute>
                <xsl:attribute name="digit"><xsl:value-of select="/catalog/store/product[id=$storeid]/digit"/></xsl:attribute>
                <xsl:attribute name="type">text</xsl:attribute>
                <xsl:attribute name="disabled">disabled</xsl:attribute>
                <xsl:attribute name="value"></xsl:attribute>
            </xsl:element>
        </xsl:when>
        <xsl:otherwise>
            <xsl:value-of select="name"/>
            <xsl:element name="input">
                <xsl:attribute name="id"><xsl:value-of select="$ingname"/>-perc</xsl:attribute>
                <xsl:attribute name="class">perc</xsl:attribute>
                <xsl:attribute name="type">hidden</xsl:attribute>
                <xsl:attribute name="value">
                    <xsl:value-of select="percent"/>
                </xsl:attribute>
            </xsl:element>
            <xsl:element name="input">
                <xsl:attribute name="id"><xsl:value-of select="$ingname"/>-weight</xsl:attribute>
                <xsl:attribute name="class">weight</xsl:attribute>
                <xsl:attribute name="unit"><xsl:value-of select="unit"/></xsl:attribute>
                <xsl:attribute name="digit"><xsl:value-of select="digit"/></xsl:attribute>
                <xsl:attribute name="type">text</xsl:attribute>
                <xsl:attribute name="disabled">disabled</xsl:attribute>
                <xsl:attribute name="value"></xsl:attribute>
            </xsl:element>
          </xsl:otherwise>
        </xsl:choose>
    </xsl:element>
</xsl:template>

<xsl:template match="product" mode="normal" >
    <span class="ingredient">
        <xsl:element name="img">
              <xsl:attribute name="src">
                    <xsl:value-of select="image"/>
              </xsl:attribute>
              <xsl:attribute name="alt">
                    <xsl:value-of select="name"/>
              </xsl:attribute>
        </xsl:element>
        <p class="lbl"><xsl:value-of select="name"/></p>
    </span>
</xsl:template>
</xsl:stylesheet>